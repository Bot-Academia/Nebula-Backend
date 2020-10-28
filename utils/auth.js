const jwt = require('jsonwebtoken');

const newToken = (user) => {
  // const token = await jwt.sign(JSON.stringify({ id: user._id }), 'process.env.JWT_SECRET', {
  //   expiresIn: process.env.JWT_EXP,
  // });
  var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  console.log(token);
  return token;
};

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
});

module.exports = newToken;
module.exports = verifyToken;
