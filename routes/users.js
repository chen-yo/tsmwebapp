var express = require('express');
const { Op } = require('sequelize');
const { ValidationError } = require('../errors');
var router = express.Router();
const User = require('../models/user.model');
const validateUserRules = require('../validation/validateUsers');
const { validate } = require("../validation/validationUtils");

router.get('/', async function (req, res, next) {
  let users = await User.findAll({
    order: [['id', 'ASC']]
  });
  res.json(users);
});

router.post('/', validateUserRules(), validate, async (req, res, next) => {
  const email = req.body.email;
  
  const existingUser = await User.findOne({
    where: {
      email
    }
  });

  if (existingUser) {
    throw ValidationError.createValidationErrorFromFields({
      email: 'Email already exist'
    });
  }

  newUser = await User.create({ email });

  res.json(newUser);
});

router.put('/', validateUserRules(), validate, async (req, res, next) => {
  const id = req.body.id;
  let user = await User.findByPk(id);

  if (!user) {
    throw ValidationError.createValidationErrorFromFields({
      id: `User with id ${id} does not exists`
    });
  }

  const alreadyExist = await User.findOne({
    where: {
      email: req.body.email,
      id: {
        [Op.not]: user.id
      }
    }
  });

  if (alreadyExist) {
    throw ValidationError.createValidationErrorFromFields({
      email: 'Email already exist'
    });
  }

  const { email } = req.body;
  user.email = email;
  await user.save();
  res.json(user);
});

router.delete('/:id(\\d+)', async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    throw ValidationError.createValidationErrorFromFields({ id: 'User does not exist' });
  }

  await user.destroy();
  return res.json(user);
});
module.exports = router;
