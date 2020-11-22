const Router = require('express');
const {
  getAll, deleteOne, getOne, createOne, changeStatus,
} = require('../controllers/event');
const authenticate = require('../middleware/auth');

const router = Router();

router.route('/:clubId')
  .get(authenticate, getAll())
  .post(authenticate, createOne());

router.route('/:clubId/:eventId')
  .get(authenticate, getOne())
  .put(authenticate, changeStatus())
  .delete(authenticate, deleteOne());

module.exports = router;
