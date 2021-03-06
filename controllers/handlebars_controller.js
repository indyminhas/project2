const express = require("express");

const router = express.Router();

const db = require("../models");


// If user is not signed in, send to login, if they are signed in, SEND to user page.
router.get('/', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    res.redirect('/user')
  }
});

//renders login
router.get('/login', (req, res) => {
  res.render('index')
});

// If not signed in, send to log in otherwise RENDER user page
router.get('/user', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login')
  } else {
    db.User.findOne({
      where: { id: req.session.user.id },
    }
    ).then(result => {
      res.render('user', { user_name: result.user_name, email: result.email })
      // res.status(204).end();
    }).catch(err => {
      res.status(500).end();
    });
  };
});

// Renders the room page with specific room data
router.get('/room/:routename', (req, res) => {
  if (!req.session.user) {
    res.redirect('/login/' + req.params.routename)
  } else {
    res.render('gamewindow', { routename: req.params.routename })
  };
});

//renders login for invited player, with a redirect included for after logging in
router.get('/login/:routename', (req, res) => {
  res.render('index', { routename: req.params.routename })
});


module.exports = router;