var express = require('express');
const passport = require('passport');

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/secret', isAuthenticated, (req, res) => {
  res.render('secret');
});

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
  if (!req.user) {
    res.redirect('/auth/twitter');
  }
  return next();
}

module.exports = router;
