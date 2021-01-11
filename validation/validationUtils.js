const { body, validationResult } = require('express-validator');
const { ValidationError } = require('../errors');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = {};
  errors.array().map(err => (extractedErrors[err.param] = err.msg));

  throw ValidationError.createValidationErrorFromFields(extractedErrors)
};

module.exports = {
  validate
};
