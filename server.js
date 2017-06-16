const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const path    = require("path");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const auth = require("./auth.js");
const helmet = require('helmet');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator()); // Add this after the bodyParser middlewares
app.use(express.static(__dirname + '/src/', {index: "app/index.html"}));
app.use(helmet());

/*app.get('/src/app', function (req, res) {
    res.sendFile(path.join(__dirname, "src/app/index.html"));
}); */

passport.use(new LocalStrategy({
    usernameField: 'email',
  },
  function(email, password, done) {
    auth.getUserByEmail(email).then((user) => {
        if(user){
            console.log(user.salt);
            user.validPassword(password).then((result) => {
                if (result === true){
                    done(null, user)
                }
                else{
                    done(null, false)
                }
            }, (error) => {
                done(error)
            });
        }
        else{
            done(null, false)
        }
    }, (error) => {
        done(error)
    });
}));

app.post('/session', 
         passport.authenticate('local'),
         (req, res) => {
             res.send("Successful login");
         });

app.post("/signup", (req, res) => {
    console.log("hits signup"); 
    auth.asyncSignup(req, res).then((result) => {
        res.send("Success");
    }).catch((error) => {
        res.send("Failure");
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});