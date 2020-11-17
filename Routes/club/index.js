const Router = require('express');
const model = require('../../models/club');
const {
  getAll, deleteOne, getOne, createOne,
} = require('../../controllers/club');
const authenticate = require('../../middleware/auth');


const router = Router();

router.route('/')
  .get(getAll(model))
  .post(authenticate,createOne(model));

router.route('/:id')
  .get(getOne(model))
  .delete(authenticate,deleteOne(model));

module.exports = router;
