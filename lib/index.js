/* eslint-disable no-console */
const isBotByUserAgent = require('./is-bot-by-user-agent');
const isAsset = require('./is-asset');
const validateConfig = require('./validate-config');

module.exports = function(params = {}) {
  validateConfig(params);

  const {
    cacheInstance = null,
    isBot = isBotByUserAgent,
    getCacheKey = null,
    getStatusAndBody = null
  } = params;

  return async function(request, response, next) {
    if (!isBot(request) || isAsset(request)) {
      next();
      return;
    }
    const cacheKey = await getCacheKey(request);
    let content;
    try {
      content = await cacheInstance.get(cacheKey);
    } catch (error) {
      console.error(error);
      next();
      return;
    }
    if (content && content.body && content.status) {
      response.status(content.status).end(content.body);
      return;
    }
    try {
      content = await getStatusAndBody(request);
    } catch (error) {
      console.error(error);
      next();
      return;
    }
    cacheInstance.set(cacheKey, content);
    response.status(content.status).end(content.body);
  };
};