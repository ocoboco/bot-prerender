const { extensionsToIgnore } = require('./constants');

module.exports = function isAsset(request) {
  const path = request.path.toLowerCase();
  return extensionsToIgnore.some(function(extension) {
    return path.endsWith(extension);
  });
};