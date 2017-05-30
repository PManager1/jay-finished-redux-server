const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  console.log('6- authentication --- inside tokenForUser = user = ',user);
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}


exports.signin = function (req,res,next) {
  // so we have a way to keep the users away from this route, if they've not provided us with correct username and password.
//  this is happenign in router,js  via the middleware
  // Uer has already have their email and passwod auth'd
    // we just need to give them a token.
console.log('18- coming in signin on authentication.js, req.user =', req.user);
  // tokenForUser
  res.send({ token: tokenForUser(req.user) });
}




exports.signup = function (req,res,next) {
  // res.send({ success : 'true'});
console.log('28- coming insie authentication signup');
const email = req.body.email;
const password = req.body.password;

// check if a user with a given email exists.
User.findOne({ email: email }, function (err, existingUser) {

  if (err) {
      return next(err);
  }
  if(existingUser){  // 422 = unprocessable entity, the data you provided is bad
    return res.status(422).send({error: 'Email already taken'});
  }

  // If the user doenst exist, create and save it.
  const user = new User({
      email: email,
      password: password
  });

if (!email || !password) {
    return res.status(422).send({ error: 'you must provide email and password'});
}

  // Inform on the client side that user has been created.
  user.save(function (err) {
      if(err) {return next(err); }
      // res.json({success: true});
      res.json({ token: tokenForUser(user) });
  });
});
}









//
