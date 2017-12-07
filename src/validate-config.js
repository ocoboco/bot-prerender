module.exports = function validateConfig(params) {
  const {
    cacheInstance = null,
    isBot = function() {},
    getCacheKey = null,
    getStatusAndBody = null
  } = params;
  if (!cacheInstance) {
    throw new Error('config.cacheInstance is not provided');
  }
  if (!cacheInstance.get) {
    throw new Error('config.cacheInstance does not have get() method');
  }
  if (!cacheInstance.set) {
    throw new Error('config.cacheInstance does not have set() method');
  }
  if (typeof isBot !== 'function') {
    throw new Error('config.isBot function is not provided');
  }
  if (typeof getCacheKey !== 'function') {
    throw new Error('config.getCacheKey function is not provided');
  }
  if (typeof getStatusAndBody !== 'function') {
    throw new Error('config.getStatusAndBody function is not provided');
  }
};