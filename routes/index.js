const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/products', require('./products'));
router.use('/categories', require('./categories'));

router.get(
  '/login',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Login with GitHub OAuth'
     #swagger.description = 'Redirects user to GitHub for authentication. For testing, open this route directly in your browser tab.'
  */
  passport.authenticate('github'),
  (req, res) => {}
);

router.get(
  '/logout',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Logout user'
     #swagger.description = 'Logs the user out and terminates the current session.'
  */
  function (req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.session.destroy(function () {
        res.redirect('/');
      });
    });
  }
);

router.get(
  '/github/callback',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'GitHub OAuth callback'
     #swagger.description = 'Callback URL for GitHub OAuth authentication.'
  */
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false
  }),
  (req, res) => {
    req.session.user = req.user;
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
      }
      res.redirect('/');
    });
  }
);

router.get(
  '/',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Get authentication status'
     #swagger.description = 'Displays whether the user is logged in or logged out.'
  */
  (req, res) => {
    if (req.session.user !== undefined) {
      res.send(`
        <h2>Logged in as ${req.session.user.displayName || req.session.user.username}</h2>
        <p><a href="/logout">Logout</a> &nbsp;|&nbsp; <a href="/api-docs">API Documentation</a></p>
      `);
    } else {
      res.send(`
        <h2>Logged Out</h2>
        <p><a href="/login">Login with GitHub</a> &nbsp;|&nbsp; <a href="/api-docs">API Documentation</a></p>
      `);
    }
  }
);

module.exports = router;
