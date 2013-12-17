var chai = require('chai');

suite('loupe', function() {
  test('custom inspect()', function() {
    var obj = {
      outer: {
        inspect: function () {
          return { foo: 'bar' };
        }
      }
    };

    expect(inspect(obj)).to.equal('{ outer: { foo: \'bar\' } }');
  });

  test('function', function() {
    var fn = function what() {}
    expect(inspect(fn)).to.equal('[Function: what]');
  });

  test('array', function() {
    expect(inspect([1, 2, 3])).to.equal('[ 1, 2, 3 ]');
  });

  test('regex', function() {
    expect(inspect(/foo/)).to.equal('/foo/');
  });

  test('number', function() {
    expect(inspect(1)).to.equal('1');
  });

  test('string', function() {
    expect(inspect('foo')).to.equal("'foo'");
  });

  test('object', function() {
    expect(inspect({ foo: 'bar' })).to.equal("{ foo: 'bar' }");
  });

  test('boolean', function() {
    expect(inspect(true)).to.equal('true');
  });

  test('undefined', function() {
    expect(inspect(undefined)).to.equal('undefined');
  });

  test('null', function() {
    expect(inspect(null)).to.equal('null');
  });

  test('Date', function() {
    expect(inspect(new Date('2013-01-01'))).to.equal('Tue, 01 Jan 2013 00:00:00 GMT');
  });

  test('Error', function() {
    expect(inspect(new Error('test'))).to.equal('[Error: test]');
  });
});
