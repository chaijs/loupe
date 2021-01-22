import inspect from '../index'
import { expect } from 'chai'
describe('symbols', () => {
  /* eslint-disable */
  it('returns Symbol() for empty Symbol', () => {
    expect(inspect(Symbol())).to.equal('Symbol()')
  })

  it('returns string wrapped in quotes', () => {
    expect(inspect('abc')).to.equal("'abc'")
  })

  it('escapes single quotes', () => {
    expect(inspect("ab'c")).to.equal("'ab\\'c'")
  })

  it('does not escape double quotes', () => {
    expect(inspect('ab"c')).to.equal("'ab\"c'")
  })

  it('escapes unicode characters', () => {
    expect(inspect('\u001b')).to.equal("'\\u001b'")
  })

  describe('colors', () => {
    it('returns string with green color, if colour is set to true', () => {
      expect(inspect('abc', { colors: true })).to.equal("\u001b[32m'abc'\u001b[39m")
    })
  })
})
