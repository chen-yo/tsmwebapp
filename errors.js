class BadRequestError extends Error {
  constructor(error) {
    super(error.message);

    this.data = { error };
    this.statusCode = 400;
  }
}

class ResouceNotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class ValidationError extends Error {
  constructor(error = {}) {
    super(error.message);
    this.name = 'ValidationError';
    this.message = error.message ? error.message : 'Validation errors occurred';
    this.statusCode = error.statusCode ? error.statusCode : 400;
    this.errorFields = error.errorFields ? error.errorFields : {};
  }

  static createValidationErrorFromFields(fields) {
    return new ValidationError({
      errorFields: fields
    });
  }
}

module.exports = {
  ValidationError,
  ResouceNotFound,
  BadRequestError,
  Unauthorized
};
