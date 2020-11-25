const User = require('../models/user');
const auth = require('../utils/auth');

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

    try {
      const user = await User.create(req.body);
      const token = newToken(user);
      return res.status(201).send({ token });
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
      if (!user) {
        res.status(404).end();
      }
      const checkPassword = await user.checkPassword(password);
      if (checkPassword) {
        const token = newToken(user);
        return res.status(201).json({ token, user });
      }
      return res.status(401).end();
    } catch (e) {
      console.error(e);
      return res.status(500).end();
    }
  },
  getOne: async (req, res) => {
    const _id = req.params.userId;
    const user = await User.findOne({ _id }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.password = undefined;
    return res.status(200).json({ data: user });
  },
};

module.exports = controllers;
