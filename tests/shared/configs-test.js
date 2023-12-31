const { randomUUID } = require('crypto');

module.exports = {
  logger: false,
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
