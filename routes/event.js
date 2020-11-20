const Router = require('express');
const model = require('../models/event');
const {
  getAll, deleteOne, getOne, createOne,
} = require('../controllers/event');

const router = Router();

router.route('/')
  .get(getAll(model))
  .post(createOne(model));

router.route('/:id')
  .get(getOne(model))
  .delete(deleteOne(model));

module.exports = router;
