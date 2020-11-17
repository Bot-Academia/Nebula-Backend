const jwt = require('jsonwebtoken');

const newToken = (user) => {
  const token = jwt.sign(JSON.stringify({ id: user._id }), Buffer.from('process.env.JWT_SECRET').toString('base64'));
  return token;
};

const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token,Buffer.from('process.env.JWT_SECRET').toString('base64'), (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
});

module.exports = {
  newToken,
  verifyToken,
};
