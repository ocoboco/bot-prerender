const factory = require('../index');

const config = {
  cacheInstance: {
    get() {
      return Promise.resolve({
        body: '<html></html>',
        status: 200
      });
    },
    set() {}
  },
  isBot() {
    return true;
  },
  getCacheKey() {},
  getStatusAndBody() {
    return Promise.resolve({
      body: '<html><body></body></html>',
      status: 200
    });
  }
};

test('should continue for non-bot user agent', function() {
  const middleware = factory({
    ...config,
    isBot() {
      return false;
    }
  });
  const next = jest.fn();
  middleware({}, {}, next);
  expect(next.mock.calls).toHaveLength(1);
});

test('should continue for an asset path', function() {
  const middleware = factory({
    ...config,
    isBot() {
      return true;
    }
  });
  const next = jest.fn();
  middleware({
    path: '/image/my-image.png'
  }, {}, next);
  expect(next.mock.calls).toHaveLength(1);
});

test('should get the content from cache', async function() {
  const middleware = factory({
    ...config,
    isBot() {
      return true;
    }
  });
  const next = jest.fn();
  const response = {
    status: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis()
  };
  await middleware({
    path: '/'
  }, response, next);
  expect(next.mock.calls).toHaveLength(0);
  expect(response.end.mock.calls).toEqual([['<html></html>']]);
  expect(response.status.mock.calls).toEqual([[200]]);
});

test('should get the content from cache', async function() {
  const middleware = factory({
    ...config,
    isBot() {
      return true;
    },
    cacheInstance: {
      get() {
        return Promise.resolve(null);
      },
      set() {

      }
    }
  });
  const next = jest.fn();
  const response = {
    status: jest.fn().mockReturnThis(),
    end: jest.fn().mockReturnThis()
  };
  await middleware({
    path: '/'
  }, response, next);
  expect(next.mock.calls).toHaveLength(0);
  expect(response.end.mock.calls).toEqual([['<html><body></body></html>']]);
  expect(response.status.mock.calls).toEqual([[200]]);
});