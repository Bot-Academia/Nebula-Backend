const Router = require('express');

const router = Router();

router.route('/events')
  .get((req, res) => {
    res.send({ msg: 'Events' });
  })
  .post((req, res) => {
    res.send({ msg: 'Events POST' });
  });

module.exports = router;
