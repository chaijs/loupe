/* eslint-disable prefer-arrow-callback */
import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('functions', () => {
  it('returns the functions name wrapped in `[Function ]`', () => {
    expect(inspect(function foo() {})).to.equal('[Function foo]')
  })

  it('returns the `[Function]` if given anonymous function', () => {
    expect(inspect(function () {})).to.equal('[Function]')
  })

  describe('colors', () => {
    it('returns string with cyan color, if colour is set to true', () => {
      expect(inspect(function foo() {}, { colors: true })).to.equal('\u001b[36m[Function foo]\u001b[39m')
    })
  })

  describe('truncate', () => {
    it('returns the full representation when truncate is over string length', () => {
      expect(inspect(function foobar() {}, { truncate: 17 })).to.equal('[Function foobar]')
    })

    it('truncates function names longer than truncate (16)', () => {
      expect(inspect(function foobar() {}, { truncate: 16 })).to.equal('[Function foob…]')
    })

    it('truncates function names longer than truncate (15)', () => {
      expect(inspect(function foobar() {}, { truncate: 15 })).to.equal('[Function foo…]')
    })
    it('truncates function names longer than truncate (14)', () => {
      expect(inspect(function foobar() {}, { truncate: 14 })).to.equal('[Function fo…]')
    })

    it('truncates function names longer than truncate (13)', () => {
      expect(inspect(function foobar() {}, { truncate: 13 })).to.equal('[Function f…]')
    })

    it('truncates function names longer than truncate (12)', () => {
      expect(inspect(function foobar() {}, { truncate: 12 })).to.equal('[Function …]')
    })

    it('truncates function names longer than truncate (11)', () => {
      expect(inspect(function foobar() {}, { truncate: 11 })).to.equal('[Function …]')
    })

    it('does not truncate decoration even when truncate is short (4)', () => {
      expect(inspect(function foobar() {}, { truncate: 4 })).to.equal('[Function …]')
    })

    it('does not truncate decoration even when truncate is short (3)', () => {
      expect(inspect(function foobar() {}, { truncate: 3 })).to.equal('[Function …]')
    })

    it('does not truncate decoration even when truncate is short (2)', () => {
      expect(inspect(function foobar() {}, { truncate: 2 })).to.equal('[Function …]')
    })

    it('does not truncate decoration even when truncate is short (1)', () => {
      expect(inspect(function foobar() {}, { truncate: 1 })).to.equal('[Function …]')
    })

    it('does not truncate decoration even when truncate is short (0)', () => {
      expect(inspect(function foobar() {}, { truncate: 0 })).to.equal('[Function …]')
    })
  })
})
