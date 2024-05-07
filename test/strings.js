import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('strings', () => {
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

  describe('truncate', () => {
    it('returns the full string representation when truncate is over string length', () => {
      expect(inspect('foobarbaz', { truncate: 11 })).to.equal("'foobarbaz'")
    })

    it('truncates strings longer than truncate (10)', () => {
      expect(inspect('foobarbaz', { truncate: 10 })).to.equal("'foobarb…'")
    })

    it('truncates strings longer than truncate (9)', () => {
      expect(inspect('foobarbaz', { truncate: 9 })).to.equal("'foobar…'")
    })
    it('truncates strings longer than truncate (8)', () => {
      expect(inspect('foobarbaz', { truncate: 8 })).to.equal("'fooba…'")
    })

    it('truncates strings longer than truncate (7)', () => {
      expect(inspect('foobarbaz', { truncate: 7 })).to.equal("'foob…'")
    })

    it('truncates strings longer than truncate (6)', () => {
      expect(inspect('foobarbaz', { truncate: 6 })).to.equal("'foo…'")
    })

    it('truncates strings longer than truncate (5)', () => {
      expect(inspect('foobarbaz', { truncate: 5 })).to.equal("'fo…'")
    })

    it('truncates strings longer than truncate (4)', () => {
      expect(inspect('foobarbaz', { truncate: 4 })).to.equal("'f…'")
    })

    it('truncates strings longer than truncate (3)', () => {
      expect(inspect('foobarbaz', { truncate: 3 })).to.equal("'…'")
    })

    it('truncates strings involving surrogate pairs longer than truncate (7)', () => {
      expect(inspect('🐱🐱🐱', { truncate: 7 })).to.equal("'🐱🐱…'") // not '🐱🐱\ud83d…'
    })

    it('truncates strings involving surrogate pairs longer than truncate (6)', () => {
      expect(inspect('🐱🐱🐱', { truncate: 6 })).to.equal("'🐱…'") // not '🐱\ud83d…'
    })

    it('truncates strings involving surrogate pairs longer than truncate (5)', () => {
      expect(inspect('🐱🐱🐱', { truncate: 5 })).to.equal("'🐱…'")
    })

    it('truncates strings involving graphemes than truncate (5)', () => {
      expect(inspect('👨‍👩‍👧‍👧', { truncate: 5 })).to.equal("'👨…'") // partial support: valid string for unicode
    })

    it('disregards truncate when it cannot truncate further (2)', () => {
      expect(inspect('foobarbaz', { truncate: 2 })).to.equal("'…'")
    })

    it('disregards truncate when it cannot truncate further (1)', () => {
      expect(inspect('foobarbaz', { truncate: 1 })).to.equal("'…'")
    })

    it('disregards truncate when it cannot truncate further (0)', () => {
      expect(inspect('foobarbaz', { truncate: 0 })).to.equal("'…'")
    })
  })
})
