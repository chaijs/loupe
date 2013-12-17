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
});
