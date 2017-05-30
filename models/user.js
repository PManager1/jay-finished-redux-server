const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// on Save hook, ecrypt password
userSchema.pre('save', function (next) {
    const user = this;

    bcrypt.genSalt(10, function (err, salt) {
          if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) { return next(err);  }

          user.password = hash;
          next();
          })
    });
});

// methods means, whenver we create a user object, we're going to have access to any funciotns that
// we define over here , over its property.
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  // here this.password is our user model, ie the hashed password
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
      if (err) { return callback(err);  }
      // else
      callback(null, isMatch);
    });
}


// create the model class.
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
