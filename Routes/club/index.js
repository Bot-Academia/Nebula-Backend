const Router = require('express');
const {
  getAll, deleteOne, getOne, createOne, join,
} = require('../../controllers/club');
const authenticate = require('../../middleware/auth');

const router = Router();

router.route('/')
  .get(getAll())
  .post(authenticate, createOne());

router.route('/:id')
  .get(getOne())
  .delete(authenticate, deleteOne());

router.route('/join/:id')
  .put(authenticate, join());

module.exports = router;
