/* eslint-disable no-console */
const Router = require('express');
const model = require('../../models/club');

const router = Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const docs = await model
        .find({ })
        .lean()
        .exec();

      res.status(200).json({ data: docs });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  })
  .post(async (req, res) => {
    try {
      const doc = await model.create({ ...req.body });
      res.status(201).json({ data: doc });
    } catch (e) {
      console.error(e);
      res.status(404).end();
    }
  });

router.route('/:id')
  .get(async (req, res) => {
    try {
      const doc = await model
        .findOne({ _id: req.params.id })
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
  })
  .delete(async (req, res) => {
    try {
      const removed = await model.findOneAndRemove({
        _id: req.params.id,
      });

      if (!removed) {
        return res.status(400).end();
      }

      return res.status(200).json({ data: removed });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  });

module.exports = router;
