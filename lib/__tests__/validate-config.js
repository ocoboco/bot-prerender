const validateConfig = require('../validate-config');

test('should throw an error', function() {
  expect(function() {
    validateConfig();
  }).toThrow();

  expect(function() {
    validateConfig({
      isBot() {},
      getCacheKey() {}
    });
  }).toThrow();

  expect(function() {
    validateConfig({
      cacheInstance: {
        get() {}
      },
      isBot() {},
      getCacheKey() {},
      getStatusAndBody() {}
    });
  }).toThrow();
});

test('should pass valid configuration', function() {
  expect(function() {
    validateConfig({
      cacheInstance: {
        get() {},
        set() {}
      },
      isBot() {},
      getCacheKey() {},
      getStatusAndBody() {}
    });
  }).not.toThrow();
});