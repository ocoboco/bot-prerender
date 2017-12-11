const isAsset = require('../is-asset');

test('should return true for an asset path', function() {
  expect(isAsset({
    path: '/image.png'
  })).toBe(true);

  expect(isAsset({
    path: '/path/image.png'
  })).toBe(true);

  expect(isAsset({
    path: '/text/file.txt'
  })).toBe(true);

  expect(isAsset({
    path: '/longer/PATH/BIG_FILE.JS'
  })).toBe(true);
});

test('should return false for a non-asset path', function() {
  expect(isAsset({
    path: '/'
  })).toBe(false);

  expect(isAsset({
    path: '/game/batman'
  })).toBe(false);
});