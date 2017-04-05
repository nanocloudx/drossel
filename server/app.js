const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const helmet = require('helmet');
const compression = require('compression');
const session = require('express-session');
const csrf = require('csurf');
const DrosselRateLimit = require('drossel-rate-limit');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');

const router = require('./router');
const TwitterStrategy = require('./utils/TwitterStrategy');
const redisClient = require('./utils/redis');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.enable('trust proxy');
app.disable('x-powered-by');
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//--------------------------------------------------
// アクセス制限
//--------------------------------------------------
app.use(new DrosselRateLimit({
  store: redisClient,
  time: 10, // 10 sec
  limit: 10, // 10 requests
  prefix: 'limit:',
  message: '短時間での連続アクセスはご遠慮くださいまし(´・ω・`)'
}));


//--------------------------------------------------
// セッション保持
//--------------------------------------------------
app.use(session({
  secret: 'drosselSecret',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient,
    prefix: 'session:',
    ttl: 60 * 60 * 24 * 3 // 3日間アクセスがない場合は Redis からセッション削除
  })
}));


//--------------------------------------------------
// twitterログイン
//--------------------------------------------------
app.use(csrf());
app.use(passport.initialize());
app.use(passport.session());
passport.use('twitter', new TwitterStrategy());
// パスポート隠蔽
passport.serializeUser((account, done) => {
  done(null, {
    id: account.id,
    name: account.name
  });
});
// パスポート復元
passport.deserializeUser((account, done) => {
  done(null, account);
});


//--------------------------------------------------
// ルーティング
//--------------------------------------------------
// SSL強制
app.use('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === 'http') {
    res.redirect('https://' + req.headers.host + req.url);
  } else {
    return next();
  }
});

// APIアクセス
app.use('/api/', (req, res, next) => {
  const contentType = req.headers['content-type'];
  if (contentType && contentType.indexOf('application/json') !== 0) {
    res.status(415);
    res.json({ error: 'UNSUPPORTED_MEDIA_TYPE' });
    return;
  }
  // リファラーがdrossel.io(またはreviewApp)からでなければAPIを叩かせない
  const drosselRegExp = /^https?:\/\/((www|stage|localhost)\.)?drossel\.io(:3000)?\//;
  const herokuRegExp = /^https?:\/\/drossel-stage-pr-([0-9]+\.)?herokuapp\.com\//;
  if (!drosselRegExp.test(req.headers.referer) && !herokuRegExp.test(req.headers.referer)) {
    res.status(403);
    res.json({ error: 'FORBIDDEN' });
    return;
  }
  next();
});

// ページアクセス
app.use('/', router);


//--------------------------------------------------
// エラーハンドリング
//--------------------------------------------------
app.use((err, req, res, _) => {
  console.log('APP ERROR::', err);
  if (err.code === 'LIMIT_FILE_SIZE') {
    res.status(413);
    res.json({ error: 'PAYLOAD_TOO_LARGE' });
    return;
  }
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(400);
    res.json({ error: 'BAD_REQUEST' });
    return;
  }
  res.status(err.statusCode);
  res.json({
    error: err.name,
    message: err.message
  });
});
// catch 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// development
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      isNotFound: err.status === 404,
      error: err
    });
  });
}
// production
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    isNotFound: err.status === 404,
    error: {}
  });
});

module.exports = app;
