const url = require('url');

const { crawlerUserAgents } = require('./constants');

module.exports = function isBotByUserAgent(request) {
  const userAgent = request.headers['user-agent'];
  let isRequestingPrerenderedPage = false;

  if (!userAgent) {
    return false;
  }

  if (request.method != 'GET' && request.method != 'HEAD') {
    return false;
  }

  //if it contains _escaped_fragment_, show prerendered page
  const parsedQuery = url.parse(request.url, true).query;
  if ('_escaped_fragment_' in parsedQuery) {
    isRequestingPrerenderedPage = true;
  }

  //if it is a bot...show prerendered page
  if (crawlerUserAgents.some(function(crawlerUserAgent) {
    return userAgent.toLowerCase().indexOf(crawlerUserAgent.toLowerCase()) !== -1;
  })) {
    isRequestingPrerenderedPage = true;
  }

  return isRequestingPrerenderedPage;
};