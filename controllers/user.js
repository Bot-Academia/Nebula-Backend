var complexity = require('complexity');     //module for password validation
const User = require('../models/user');
const auth = require('../utils/auth');

//options to check the password validation
var options = {
  uppercase: 1,  // A through Z
  lowercase: 1,  // a through z
  special: 1,  // ! @ # $ & *
  digit: 1,  // 0 through 9
  alphaNumeric: 1,  // a through Z
  min: 8,  // minumum number of characters
  max: 16, // silly idea to have maximum...
  exact: 20  // also kinda silly
}

const { newToken } = auth;

const controllers = {

  getAll: async (req, res) => {
    const filter = {};
    const all = await User.find(filter);
    res.status(200).json({ data: all });
  },
  createOne: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'need email and password' });
    }
    else if (!complexity.check(req.body.password, options)) {
      return res.status(400).json({ message: 'password should contain 1 uppercase, 1 lowercase, 1 special, 1 digit and should be min 8 characters and not more than 20 characters'});
    }
    try {
      const user = await User.create(req.body);
      const token = newToken(user);
      return res.status(201).send({ token, user });
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  },

  login: async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'need email and password' });
    }

    try {
      const { email } = req.body;
      const { password } = req.body;
      const user = await User.findOne({ email }).exec();
      if (user == null) {
        return res.status(404).json({ message: 'Wrong Email' });
      }
      const checkPassword = await user.checkPassword(password);
      if (checkPassword) {
        const token = newToken(user);
        return res.status(201).json({ token, user });
      }
      return res.status(401).json({ message: 'Wrong Password' });
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  },
  getOne: async (req, res) => {
    try {
      const user = await User
        .findOne({ _id: req.params.userId })
        .lean()
        .exec();

      if (!user) {
        return res.status(400).json({message:"Wrong User ID"});
      }
      user.password = undefined;
      res.status(200).json({ data: user });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  },
};

module.exports = controllers;
