const { CONFLICT } = require('./statusCodes');

class ConflictErr extends Error {
  constructor(message) {
    super(message);
    this.statusCode = CONFLICT;
  }
}

module.exports = ConflictErr;
