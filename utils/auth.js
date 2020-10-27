const jwt = require('jsonwebtoken');

export const newToken = (user) => jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
  expiresIn: process.env.JWT_EXP,
});

export const verifyToken = (token) => new Promise((resolve, reject) => {
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return reject(err);
    resolve(payload);
  });
});
