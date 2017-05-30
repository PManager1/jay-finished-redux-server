const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// 'jwt' authenticate user with jwt strategy, and  session: false   when a user is authenticated dont try to create a session
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });


module.exports = function (app) {
  app.get('/', requireAuth, function (req,res) {
      res.send({ message : 'Super secret code is ABC123' });
  });

app.post('/signin', requireSignin, Authentication.signin);
app.post('/signup', Authentication.signup);


}
