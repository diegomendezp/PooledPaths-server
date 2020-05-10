const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: 'Username is required',
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 4
    },
    phone: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.createdAt;
        delete ret.updatedAt;
        delete ret.__v;
        return ret;
      },
    },
  },
);

userSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt
    .genSalt(SALT_WORK_FACTOR)
    .then(salt => {
      bcrypt.hash(user.password, salt).then(hash => {
        user.password = hash;
        next();
      });
    })
    .catch(error => next(error));
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
