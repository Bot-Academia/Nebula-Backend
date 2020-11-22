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

// routes for  "/:clubId"
const getOne = () => async (req, res) => {
  try {
    const doc = await Club
      .findOne({ _id: req.params.clubId })
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
    const club = await Club.findOne({ _id: req.params.clubId });
    if (club.team.includes(String(req.user._id))) return res.status(403).json({ message: 'Not allowed' });
    if (club.members.includes(String(req.user._id))) return res.status(403).json({ message: 'Not allowed' });
    const removed = await Club.findOneAndRemove({
      _id: req.params.clubId,
    });
    if (!removed) {
      return res.status(400).end();
    }

    const user = await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { 'clubs.owner': req.params.clubId } }, { new: true })
      .exec();

    return res.status(200).json({ data: removed });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const join = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    if (!club) {
      return res.status(400).end();
    }

    if (club.admin == String(req.user._id)) return res.status(403).json({ message: 'Already Admin' });
    if (club.team.includes(String(req.user._id))) return res.status(403).json({ message: 'Already in Team' });
    if (club.members.includes(String(req.user._id))) return res.status(403).json({ message: 'Already Member' });

    const newClub = await Club.findOneAndUpdate({ _id: req.params.clubId }, { $push: { members: req.user._id } }, { new: true }).exec();
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { $push: { 'clubs.member': req.params.clubId } }, { new: true }).exec();
    return res.status(200).json({ data: newClub });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const leave = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    if (!club) {
      return res.status(400).end();
    }

    if (club.admin == String(req.user._id)) return res.status(403).json({ message: 'Not Allowed' });
    if (!club.members.includes(String(req.user._id))) return res.status(403).json({ message: 'Not Allowed' });

    const newClub = await Club.findOneAndUpdate({ _id: req.params.clubId }, { $pull: { members: req.user._id }, $pull: { team: req.user._id } }, { new: true }).exec();
    const user = await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { 'clubs.member': req.params.clubId } }, { new: true }).exec();
    return res.status(200).json({ data: newClub });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const addTeam = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    if (!club) {
      return res.status(400).end();
    }
    if (club.team.includes(req.params.userId)) return res.status(400).json({ message: 'Already in Team' });
    if (club.admin == String(req.user._id)) {
      const user = await User.findOne({ _id: req.params.userId });
      if (user.clubs.member.includes(req.params.clubId)) {
        const newClub = await Club.findOneAndUpdate({ _id: req.params.clubId }, { $push: { team: req.params.userId } }, { new: true });
        return res.status(200).json({ data: newClub });
      }
      res.status(400).json({ message: 'Not Member' });
    } else {
      res.status(400).json({ message: 'Not Authorised' });
    }
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const removeTeam = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    if (!club) {
      return res.status(400).end();
    }
    if (club.team.includes(req.params.userId)) {
      if (club.admin == String(req.user._id)) {
        const user = await User.findOne({ _id: req.params.userId });
        const newClub = await Club.findOneAndUpdate({ _id: req.params.clubId }, { $pull: { team: req.user._id } }, { new: true });
        return res.status(200).json({ data: newClub });
      }
      res.status(400).json({ message: 'Not Authorised' });
    } else {
      res.status(400).json({ message: 'Not in Team' });
    }
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const changeAdmin = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    if (!club) {
      return res.status(400).end();
    }
    if (String(req.user._id) == req.params.userId) return res.status(400).json({ message: 'Not Allowed' });
    if (club.team.includes(req.params.userId)) {
      if (club.admin == String(req.user._id)) {
        const newAdmin = await User.findOneAndUpdate({ _id: req.params.userId }, { $push: { 'clubs.owner': req.params.clubId }, $pull: { 'clubs.member': req.params.clubId } }, { new: true });
        const admin = await User.findOneAndUpdate({ _id: req.user._id }, { $pull: { 'clubs.owner': req.params.clubId }, $push: { 'clubs.member': req.params.clubId } }, { new: true });
        const newClub = await Club.findOneAndUpdate({ _id: req.params.clubId }, { admin: req.params.userId,$push:{team:req.user._id}}, { new: true });
        return res.status(200).json({ data: newClub });
      }
      res.status(400).json({ message: 'Not Authorised' });
    } else {
      res.status(400).json({ message: 'Not in Team' });
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
  removeTeam,
  changeAdmin,
};
