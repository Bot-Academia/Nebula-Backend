/* eslint-disable consistent-return */
/* eslint-disable no-console */
// routes for "/"
const Club = require('../models/club');
const User = require('../models/user');

const getAll = () => async (req, res) => {
  try {
    const docs = await Club
      .find({ })
      .lean()
      .exec();

    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const createOne = () => async (req, res) => {
  try {
    const doc = await Club.create({ ...req.body });
    const newDoc = await Club.findOneAndUpdate({ _id: doc._id }, { admin: req.user._id }, { new: true })
      .exec();
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { $push: { 'clubs.owner': newDoc._id } }, { new: true })
      .exec();
    res.status(201).json({ data: newDoc });
  } catch (e) {
    console.error(e);
    res.status(404).end();
  }
};

// routes for  "/:orgId"
const getOne = () => async (req, res) => {
  try {
    const doc = await Club
      .findOne({ _id: req.params.orgId })
      .lean()
      .exec();

    if (!doc) {
      return res.status(400).end();
    }

    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const deleteOne = () => async (req, res) => {
  try {
    if (club.team.includes(String(req.user._id))) return res.status(403).json({ message: 'Not allowed' });
    if (club.members.includes(String(req.user._id))) return res.status(403).json({ message: 'Not allowed' });
    const removed = await Club.findOneAndRemove({
      _id: req.params.orgId,
    });
    if (!removed) {
      return res.status(400).end();
    }

    const user = await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { 'clubs.owner': req.params.orgId } }, { new: true })
      .exec();

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const join = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.orgId });
    if (!club) {
      return res.status(400).end();
    }

    if (club.admin == String(req.user._id)) return res.status(403).json({ message: 'Already Admin' });
    if (club.team.includes(String(req.user._id))) return res.status(403).json({ message: 'Already in Team' });
    if (club.members.includes(String(req.user._id))) return res.status(403).json({ message: 'Already Member' });

    const newClub = await Club.findOneAndUpdate({ _id: re.params.orgId }, { $push: { members: req.user._id } }, { new: true }).exec();
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { $push: { 'clubs.member': re.params.orgId } }, { new: true }).exec();
    return res.status(200).json({ data: newClub });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const leave = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: re.params.orgId });
    if (!club) {
      return res.status(400).end();
    }

    if (club.admin == String(req.user._id)) return res.status(403).json({ message: 'Not Allowed' });
    if (!club.members.includes(String(req.user._id))) return res.status(403).json({ message: 'Not Allowed' });

    const newClub = await Club.findOneAndUpdate({ _id: re.params.orgId }, { $pull: { members: req.user._id }, $pull: { team: req.user._id } }, { new: true }).exec();
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { 'clubs.member': re.params.orgId } }, { new: true }).exec();
    return res.status(200).json({ data: newClub });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const addTeam = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.orgId });
    if (!club) {
      return res.status(400).end();
    }
    if (club.team.includes(req.params.userId)) return res.status(400).json({ message: 'Already in Team' });
    if (club.admin == String(req.user._id)) {
      const user = await User.findOne({ _id: req.params.userId });
      if (user.clubs.member.includes(req.params.orgId)) {
        const newClub = await Club.findOneAndUpdate({ _id: req.params.orgId }, { $push: { team: req.user._id } }, { new: true });
      } else {
        res.status(400).json({ message: 'Not Member' });
      }
    } else {
      res.status(400).json({ message: 'Not Authorised' });
    }
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

module.exports = {
  getAll,
  createOne,
  getOne,
  deleteOne,
  join,
  leave,
  addTeam,
};
