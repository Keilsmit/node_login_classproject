const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();


app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// app.use(express.static('/'));
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: "cat",
  resave: false,
  saveUninitialized: true
}));

//Allows us to set up the persistent data
app.use(function(req, res, next){
  req.session.users = {
    keith: "1234567"
  };
  next();
});

app.get('/', function(req, res, next){
  if (req.session.username){
    res.send("Hello, " + req.session.username + ". Your password is " + req.session.password + ".");
  }else{
    res.redirect("/login")
  };
  next();
});


app.get('/login', function(req, res){
  res.render('index');
});


app.post("/login", function(req, res, next){

  console.log(req.body);
  console.log(req.session.users[req.body.username]);

    if (req.session.users[req.body.username] === req.body.password) {
      req.session.username = req.body.username;
      req.session.password = req.body.password;
    };
    res.redirect('/')
});







app.listen(3000, function(){
  console.log('Your server is running...')
});
