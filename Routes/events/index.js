const Router = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send({ msg: 'Events' });
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send({ msg: 'Events POST' });
});

module.exports = router;
