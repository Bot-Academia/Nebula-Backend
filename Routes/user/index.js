const Router = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.send({ msg: 'User' });
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send({ msg: 'User POST' });
});

module.exports = router;
