const Router = require('express');

const router = Router();

router.route('/clubs')
  .get((req, res) => {
    res.send({ msg: 'Clubs' });
  })
  .post((req, res) => {
    res.send({ msg: 'Clubs POST' });
  });

module.exports = router;
