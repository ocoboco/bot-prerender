const isBotByUserAgent = require('../is-bot-by-user-agent');

const defaultRequest = {
  method: 'GET',
  headers: {
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36'
  },
  url: 'http://example.com/hello/'
};

test('should return true for a bot user agent', function() {
  expect(isBotByUserAgent({
    ...defaultRequest,
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)'
    }
  })).toBe(true);
    
  expect(isBotByUserAgent({
    ...defaultRequest,
    headers: {
      'user-agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
    }
  })).toBe(true);
});

test('should return true for an _escaped_fragment_ GET param', function() {
  expect(isBotByUserAgent({
    ...defaultRequest,
    url: 'http://example.com/hello/?_escaped_fragment_='
  })).toBe(true);

  expect(isBotByUserAgent({
    ...defaultRequest,
    url: 'http://example.com/hello/?param=value&_escaped_fragment_'
  })).toBe(true);
});

test('should return false for a non-bot user agent', function() {
  expect(isBotByUserAgent(defaultRequest)).toBe(false);

  expect(isBotByUserAgent({
    ...defaultRequest,
    headers: {}
  })).toBe(false);
});

test('should return true for a non-GET method request', function() {
  expect(isBotByUserAgent({
    ...defaultRequest,
    method: 'POST',
    headers: {
      'user-agent': 'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
    }
  })).toBe(false);
});