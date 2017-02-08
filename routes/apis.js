var express = require('express');
var app = express();
var credentials = require('../private/credentials');
var knex = require('knex')({
  client: 'pg',
  connection: credentials.pg_connection,
  debug: false
});

app.post('/', function(req, res, next) {
  res.send("----------------");
});

app.post('/signin', function(req, res, next) {
  knex('users').where({
    email: req.body.email,
    password: req.body.password
  }).then(function(user) {
    if (!user.length) console.log("로그인 실패");
    res.redirect('/');
  });
});

app.post('/signup', function(req, res, next) {
  if (req.body.password !== req.body.password_confirm) {
    console.log("비밀번호가 일치하지 않습니다");
    return res.redirect('/');
  }

  knex('users').insert({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).then(function(user) {
    console.log(user);
    if (user) {
      res.redirect('/');
    } else {
      res.send("회원가입 실패");
    }
  });
});


module.exports = app;
