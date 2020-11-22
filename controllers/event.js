/* eslint-disable consistent-return */
/* eslint-disable no-console */
const Event = require('../models/event');
const Club = require('../models/club');

// routes for "/"
const getAll = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    if (!club) {
      return res.status(400).json({ message: 'No club' });
    }
    const event = await Event
      .find({ club: req.params.clubId })
      .lean()
      .exec();

    res.status(200).json({ data: event });
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const createOne = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    if (!club) {
      return res.status(400).json({ message: 'No club' });
    }
    if (club.admin == String(req.user._id) || club.team.includes(req.user._id)) {
      const event = new Event(req.body);
      event.createdBy = req.user._id;
      event.club= req.params.clubId;
      await event.save();
      const newClub = await Club.findOneAndUpdate({ _id: req.params.clubId }, { $push: { events: event._id } }, { new: true });
      res.status(201).json({ data: event });
    } else {
      res.status(400).json({ message: 'Not Authorized' });
    }
  } catch (e) {
    console.error(e);
    res.status(404).end();
  }
};

// routes for  "/:eventId"
const getOne = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    if (!club) {
      res.status(400).json({ message: 'No club' });
    }
    if (club.events.includes(req.params.eventId)) {
      const event = await Event
        .findOne({ _id: req.params.eventId })
        .lean()
        .exec();

      if (!event) {
        return res.status(400).end();
      }

      res.status(200).json({ data: event });
    } else {
      res.status(400).json({ message: 'Event does not exist' });
    }
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
};

const deleteOne = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    if (!club) {
      return res.status(400).json({ message: 'No club' });
    }
    if (club.admin == String(req.user._id) || club.team.includes(req.user._id)) {
      const event = await Event.findOneAndRemove({ _id: req.params.eventId });
      const newClub = await Club.findOneAndUpdate({ _id: req.params.clubId }, { $pull: { events: event._id } }, { new: true });
      res.status(201).json({ data: newClub });
    } else {
      res.status(400).json({ message: 'Not Authorized' });
    }
  } catch (e) {
    console.error(e);
    res.status(404).end();
  }
};

const changeStatus = () => async (req, res) => {
  try {
    const club = await Club.findOne({ _id: req.params.clubId });
    if (!club) {
      return res.status(400).json({ message: 'No club' });
    }
    if (club.admin == String(req.user._id) || club.team.includes(req.user._id)) {
      const event = await Event.findOneAndUpdate({ _id: req.params.eventId }, { status: true }, { new: true });
      res.status(201).json({ data: event });
    } else {
      res.status(400).json({ message: 'Not Authorized' });
    }
  } catch (e) {
    console.error(e);
    res.status(404).end();
  }
};

module.exports = {
  getAll,
  createOne,
  getOne,
  deleteOne,
  changeStatus,
};
