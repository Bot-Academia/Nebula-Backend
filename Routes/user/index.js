const Router = require('express');
const controllers = require('../../controllers/user');


const router = Router();

router.route('/')
  .get(controllers.getAll);

router.route('/signup')
  .post(controllers.createOne);

router.route('/:id')
  .get(controllers.getOne);

module.exports = router;
