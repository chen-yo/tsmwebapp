const { body } = require('express-validator');

function validateUserRules() {
  return [
    body('email')
      .isEmail()
      .withMessage('Invalid email address')
      .notEmpty()
      .withMessage('Required')
  ];
}

module.exports = validateUserRules