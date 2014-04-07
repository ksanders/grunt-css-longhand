'use strict';

var grunt = require('grunt');

exports.css_longhand = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  margin: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test-margin.css');
    var expected = grunt.file.read('test/expected/test-margin.css');
    test.equal(actual, expected, 'Split margin: properties into their longhand -top, -right, -bottom, -left equivalents');

    test.done();
  },
  padding: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test-padding.css');
    var expected = grunt.file.read('test/expected/test-padding.css');
    test.equal(actual, expected, 'Split padding: properties into their longhand -top, -right, -bottom, -left equivalents');

    test.done();
  },
  border: function (test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/test-border.css');
    var expected = grunt.file.read('test/expected/test-border.css');
    test.equal(actual, expected, 'Split border: properties into their longhand -top, -right, -bottom, -left equivalents');

    test.done();
  },
};
