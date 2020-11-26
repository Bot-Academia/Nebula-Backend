const Router = require('express');
const {
  getAll, deleteOne, getOne, createOne, join, leave, addTeam, removeTeam, changeAdmin,
} = require('../controllers/club');
const authenticate = require('../middleware/auth');

const router = Router();

router.route('/')
  .get(getAll())
  .post(createOne());

router.route('/:clubId')
  .get(getOne())
  .delete(authenticate, deleteOne());

router.route('/join/:clubId')
  .put(authenticate, join());

router.route('/leave/:clubId')
  .put(authenticate, leave());

router.route('/team/:clubId/:userId')
  .put(authenticate, addTeam())
  .delete(authenticate, removeTeam());

router.route('/changeadmin/:clubId/:userId')
  .put(authenticate, changeAdmin());

module.exports = router;
