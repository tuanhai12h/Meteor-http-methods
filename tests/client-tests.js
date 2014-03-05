
// Test basicAuth
Tinytest.addAsync('http-methods - basicAuth', function(test, onComplete) {

  HTTP.call('PUT', '/login', {
    auth: 'test:1234',
    data: 'test'
  }, function(err, result) {

    test.isNull(err, 'We got an error ' + (err && err.message) );

    test.equal(result.content, 'PUT', 'Unexpected result');

    onComplete();
  });

});

// Test basicAuth
Tinytest.addAsync('http-methods - basicAuth fail', function(test, onComplete) {

  HTTP.call('PUT', '/login', {
    auth: 'test:incorrect',
    data: 'test'
  }, function(err, result) {

    test.isTrue(!!err, 'This should faile');

    // XXX: At the moment err is currently a response object eg. we got json
    // back in return. Should only be the string so we have a Meteor.error not
    // catched?
    //test.equal(err, 'failed [403] Incorrect password [403]', 'We did expect an error message');

    test.equal(result.content, 'Incorrect password [403]', 'We did expect an error message');

    onComplete();
  });

});

// Test a auth via x-auth header
Tinytest.addAsync('http-methods - x-auth', function(test, onComplete) {

  Meteor.loginWithPassword('test', '1234', function(err) {

    test.isUndefined(err, 'We have a login error: ' + (err && err.message) );

    if (err) {

      onComplete();

    } else {

      HTTP.call('GET', '/test', {
        headers: {
          'x-auth': Accounts && Accounts._storedLoginToken()
        }
      }, function(err, result) {

        test.isNull(err, 'We got an error ' + (err && err.message) );

        test.equal(result.content, 'GET', 'Unexpected result');

        onComplete();
      });
    }

  });


});

// Test a auth via x-auth header
Tinytest.addAsync('http-methods - x-auth fail', function(test, onComplete) {

  HTTP.call('GET', '/test', {
    headers: {
      'x-auth': 'incorrect'
    }
  }, function(err, result) {

    test.equal(err && err.message || '', 'failed [403] Not authenticated [403]', 'We expected an error message...');

    test.equal(result.content, 'Not authenticated [403]', 'We did expect an error message');

    onComplete();
  });


});



// Test a auth via token param
Tinytest.addAsync('http-methods - token param', function(test, onComplete) {

  Meteor.loginWithPassword('test', '1234', function(err) {

    test.isUndefined(err, 'We have a login error: ' + (err && err.message) );

    if (err) {

      onComplete();

    } else {

      HTTP.call('GET', '/test', {
        params: {
          'token': Accounts && Accounts._storedLoginToken()
        }
      }, function(err, result) {

        test.isNull(err, 'We got an error ' + (err && err.message) );

        test.equal(result.content, 'GET', 'Unexpected result');

        onComplete();
      });
    }

  });


});

// Test a auth via token param
Tinytest.addAsync('http-methods - token param fail', function(test, onComplete) {

  HTTP.call('GET', '/test', {
    params: {
      'token': 'incorrect'
    }
  }, function(err, result) {

    test.equal(err && err.message || '', 'failed [403] Not authenticated [403]', 'We expected an error message...');

    test.equal(result.content, 'Not authenticated [403]', 'We did expect an error message');

    onComplete();
  });


});


//Test API:
//test.isFalse(v, msg)
//test.isTrue(v, msg)
//test.equalactual, expected, message, not
//test.length(obj, len)
//test.include(s, v)
//test.isNaN(v, msg)
//test.isUndefined(v, msg)
//test.isNotNull
//test.isNull
//test.throws(func)
//test.instanceOf(obj, klass)
//test.notEqual(actual, expected, message)
//test.runId()
//test.exception(exception)
//test.expect_fail()
//test.ok(doc)
//test.fail(doc)
//test.equal(a, b, msg)
