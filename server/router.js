const express = require('express');
const passport = require('passport');
const weatherAPI = require('./api/weather');
const articlesAPI = require('./api/articles');

const router = express.Router();

const pages = [
  '/', '/work', '/article', '/about', '/playground', '/playground/*'
];

router.get(pages, function(req, res, next) {
  res.render('index');
});

router.get('/secret', isAuthenticated, (req, res) => {
  res.render('secret');
});

router.get('/api/weather', weatherAPI.fetch);
router.get('/api/articles/qiita', articlesAPI.fetchQiitaList);
router.get('/api/articles/medium', articlesAPI.fetchMediumList);
router.get('/api/articles/twitter', articlesAPI.fetchTwitterList);

//--------------------------------------------------
// Authentication
//--------------------------------------------------
router.get('/auth/twitter', passport.authenticate('twitter', {
  successRedirect: '/?status=loginSuccess',
  failureRedirect: '/?status=loginFailure'
}));
router.get('/auth/logout', (req, res) => {
  req.logout();
  req.user = null;
  res.redirect('/?status=logoutSuccess');
});

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  }
  res.redirect('/auth/twitter');
}

module.exports = router;
