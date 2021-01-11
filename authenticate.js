const { OAuth2Client } = require('google-auth-library');
var express = require('express');
const User = require('./models/user.model');

const CLIENT_ID =
  '75271066330-l0l8s4aec6i2athfgals23r46n2rm0u5.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

async function checkAuth(req, res, next) {
  const idToken = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null;

  if (!idToken) {
    res.status(401).json({ errors: 'Not Authorized' });
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: CLIENT_ID
  });

  const email = ticket.getPayload().email;
  let user = await User.findByPk(email);

  if (!user) {
    res.status(401).json({ errors: 'Not Authorized' });
  }

  req.user = user;
  next();
}

module.exports = checkAuth;
