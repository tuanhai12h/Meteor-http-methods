Package.describe({
    summary: 'Adds HTTP.methods RESTful'
});

Package.on_use(function(api) {
  'use strict';
  api.use(['webapp', 'underscore', 'ejson', 'srp'], 'server');

  api.use('http', { weak: true });

  api.use('accounts-base', ['client', 'server'], { weak: true });

  api.export && api.export('HTTP');

  api.export && api.export('_methodHTTP', { testOnly: true });

  api.add_files('http.methods.client.api.js', 'client');
  api.add_files('http.methods.server.api.js', 'server');

});

Package.on_test(function (api) {
  api.use(['test-helpers', 'accounts-password'], ['server', 'client']);
  api.use('http-methods', ['server']);
  api.use('http', 'client');
  api.use(['tinytest', 'underscore', 'ejson', 'ordered-dict',
           'random', 'deps']);

  api.add_files('tests/client-tests.js', 'client');
  api.add_files('tests/server-tests.js', 'server');
});
