var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
const {Unauthorized} = require('../errors')

router.post("/hasAccess", async function (req, res) {
  const email = req.body.email;
  let user = await User.findOne({where: {email}});
  if(!user) {
      throw new Unauthorized('You are not authorized to use this app')
  }
  res.json(user);
});

module.exports = router;
