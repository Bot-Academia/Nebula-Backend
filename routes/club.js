const Router = require('express');
const {
  getAll, deleteOne, getOne, createOne, join, leave, addTeam, removeTeam, changeAdmin,
} = require('../controllers/club');
const authenticate = require('../middleware/auth');

const router = Router();

router.route('/')
  .get(getAll())
  .post(authenticate, createOne());

router.route('/:orgId')
  .get(getOne())
  .delete(authenticate, deleteOne());

router.route('/join/:orgId')
  .put(authenticate, join());

router.route('/leave/:orgId')
  .put(authenticate, leave());

router.route('/team/:orgId/:userId')
  .put(authenticate, addTeam())
  .delete(authenticate, removeTeam());

router.route('/changeadmin/:orgId/:userId')
  .put(authenticate, changeAdmin());

module.exports = router;
