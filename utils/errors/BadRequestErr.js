const { BAD_REQUEST } = require('./statusCodes');

class BadRequestErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = BadRequestErr;
