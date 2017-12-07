const { extensionsToIgnore } = require('./constants');

module.exports = function isAsset(request) {
  return extensionsToIgnore.some(function(extension) {
    return request.path.toLowerCase().endsWith(extension);
  });
};