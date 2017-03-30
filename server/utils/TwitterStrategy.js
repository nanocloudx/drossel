const PassportTwitter = require('passport-twitter');
const account = require('../models/account');

class TwitterStrategy {
  constructor() {
    return new PassportTwitter.Strategy({
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL !== 'heroku_callback'
        ? process.env.TWITTER_CALLBACK_URL
        : `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/auth/twitter`
    }, (accessToken, refreshToken, extraParams, profile, done) => { // eslint-disable-line max-params
      return Promise.resolve().then(() => {
        // 登録アカウント確認
        return account.fetchByTwitterId(profile.id);
      }).then((result) => {
        // いない場合
        if (!result) {
          return account.create({
            name: profile.displayName,
            twitterId: profile.id,
            twitterName: profile.username,
            twitterImage: convertTwitterImageUrl(profile._json.profile_image_url)
          }).then(() => {
            return account.fetchByTwitterId(profile.id);
          });
        }
        // いた場合(screen_nameが変更されている)
        if (result.twitterName !== profile.username) {
          return account.updateTwitterName(
            result.id,
            profile.screenName
          ).then(() => {
            return account.fetchByTwitterId(profile.id);
          });
        }
        // いた場合(profile_image_urlが変更されている)
        if (result.twitterImage !== convertTwitterImageUrl(profile._json.profile_image_url)) {
          return account.updateTwitterImage(
            result.id,
            convertTwitterImageUrl(profile._json.profile_image_url)
          ).then(() => {
            return account.fetchByTwitterId(profile.id);
          });
        }
        // いた場合
        return result;
      }).then((result) => {
        // 認証成功
        return done(null, result);
      }).catch((error) => {
        // 認証失敗
        return done(error);
      });
    });
  }
}

function convertTwitterImageUrl(url) {
  const prefix = /http:\/\/pbs.twimg.com\/profile_images\//;
  const postfix = /_normal/;
  return url.replace(prefix, '').replace(postfix, '_bigger');
}

module.exports = TwitterStrategy;
