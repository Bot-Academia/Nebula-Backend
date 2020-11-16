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
      console.log(e);
      return res.status(500).end();
    }
  },

  getOne: async (req, res) => {
    const entryno = req.params.id;
    const user = await User.findOne({ entryno }).exec();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    delete user.password;
    return res.status(200).json({ data: user });
  },
};

module.exports = controllers;
