const Router = require('express');
const {
  getAll, deleteOne, getOne, createOne, join, leave, addTeam
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

router.route('/addteam/:orgId/:userId')
  .put(authenticate, addTeam());

module.exports = router;
