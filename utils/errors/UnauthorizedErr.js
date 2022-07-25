const { UNAUTHORIZED } = require('./statusCodes');

class UnauthorizedErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = UnauthorizedErr;
