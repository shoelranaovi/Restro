const Log = require('../model/log.model');

const logger = {
  async logActivity(action, details, status = 'info') {
    try {
      await Log.create({
        action,
        details,
        status,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Logging error:', error);
    }
  }
};

module.exports = logger;