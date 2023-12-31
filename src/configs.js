const { randomUUID } = require('crypto');

module.exports = {
  logger: true,
  genReqId(req) {
    return randomUUID();
  },
  ajv: {
    customOptions: {
      removeAdditional: true,
      coerceTypes: 'array',
      useDefaults: true,
    },
  },
  disableRequestLogging: true,
};
