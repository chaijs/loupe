/**
 * Internal dependencies.
 */

var loupe = require('./');

/**
 * Test config.
 *
 * @param {Object} hydro
 * @api public
 */

module.exports = function(hydro) {
  hydro.set({
    formatter: 'hydro-dot',
    globals: {
      inspect: loupe
    },
    chai: {
      styles: 'expect'
    },
    tests: ['test/*.js'],
    plugins: [
      'hydro-tdd',
      'hydro-chai'
    ]
  });
};
