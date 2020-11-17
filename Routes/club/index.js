const Router = require('express');
const {
  getAll, deleteOne, getOne, createOne,
} = require('../../controllers/club');
const authenticate = require('../../middleware/auth');

const router = Router();

router.route('/')
  .get(getAll())
  .post(authenticate, createOne());

router.route('/:id')
  .get(getOne())
  .delete(authenticate, deleteOne());

module.exports = router;
