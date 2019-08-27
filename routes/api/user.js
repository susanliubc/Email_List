const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//User model
const User = require('../../models/User');

//@route  POST api/users
//@desc   Register new user
//@access Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  //Simple validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  //Check existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: 'User exists' });

    const newUser = new User({
      name,
      email,
      password
    });

    //Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      if (err) throw err;
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            {
              expiresIn: 3600000
            },
            (err, token) => {
              if (err) throw error;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
