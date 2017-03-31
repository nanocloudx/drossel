const express = require('express');
const passport = require('passport');
const articlesAPI = require('./api/articles');

const router = express.Router();

const pages = [
  '/', '/work', '/article', '/gallary', '/about'
];

router.get(pages, function(req, res, next) {
  res.render('index');
});

router.get('/secret', isAuthenticated, (req, res) => {
  res.render('secret');
});

router.get('/api/articles', articlesAPI.fetchList);

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
