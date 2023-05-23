const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');

const dbCon = mysql.createConnection({
 host : 'localhost',
 user : 'root',
 password : 'password123!@#',
 database: 'nodelogin'
});

const app = express();

app.use(session({
 secret: 'very secret',
 resave: true,
 saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('static'));

app.get('/', function(request, response) {
 response.sendFile(path.join(__dirname + '/login.html'));
});

app.post('/auth', function(request, response) {
 let username = request.body.username;
 let password = request.body.password;

 if(username && password) {
  dbCon.query(`SELECT * FROM accounts WHERE username = ? AND password = ?`, [username, password], function(error, results, fields) {

   if (error) {
    throw error
   }

   if (results.length > 0) {
    request.session.loggedin = true;
    request.session.username = username;

    response.redirect('/game');
    // response.redirect('/home');
   } else {
    response.send('Incorrect Username and/or Password');
   }
   response.end();
  });
 } else {
  response.send('Please enter Username and Password!');
  response.end();
 }
});

app.get('/home', function(request, response) {
 if (request.session.loggedin) {
  response.send('Welcome Back ' + request.session.username + '!');
 } else {
  response.send('Please login to view this page!');
 }
 response.end();
});

app.post('/signup', function(req, res) {
 let username = req.body.signUpUsername;
 let password = req.body.signUpPassword;
 let email = req.body.signUpEmail;

 if(username && password && email) {
  dbCon.query(`INSERT INTO accounts(id, username, password, email) VALUES (DEFAULT, "${username}", "${password}", "${email}")`, function (req, res) {
  console.log(username);
  console.log(password);
  console.log(email);
 });
     res.redirect('/');
 }
});

app.get('/game', function(req, res) {

 if (req.session.loggedin) {
 console.log('game route');
 res.sendFile(path.join(__dirname + '/doorgame.html'));
 } else {
    res.send('Please Login!')
 }
});

app.get('/logout', function(req, res) {
 req.session.destroy();
 console.log('logout pressed');
 res.redirect('/');
});


app.listen(3001, console.log("app listening on port 3001"));