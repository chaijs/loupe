import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('regexps', () => {
  it('returns regexp wrapped in forward slashes', () => {
    expect(inspect(/abc/)).to.equal('/abc/')
  })

  it('detects flags and adds them after the slashes', () => {
    expect(inspect(/abc/gim)).to.equal('/abc/gim')
  })

  describe('colors', () => {
    it('returns string with red color, if colour is set to true', () => {
      expect(inspect(/abc/, { colors: true })).to.equal('\u001b[31m/abc/\u001b[39m')
    })
  })

  describe('truncate', () => {
    it('returns the full representation when truncate is over string length', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 14 })).to.equal('/foobarbaz/gim')
    })

    it('truncates strings longer than truncate (13)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 13 })).to.equal('/foobarb…/gim')
    })

    it('truncates strings longer than truncate (12)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 12 })).to.equal('/foobar…/gim')
    })
    it('truncates strings longer than truncate (11)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 11 })).to.equal('/fooba…/gim')
    })

    it('truncates strings longer than truncate (10)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 10 })).to.equal('/foob…/gim')
    })

    it('truncates strings longer than truncate (9)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 9 })).to.equal('/foo…/gim')
    })

    it('truncates strings longer than truncate (8)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 8 })).to.equal('/fo…/gim')
    })

    it('truncates strings longer than truncate (7)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 7 })).to.equal('/f…/gim')
    })

    it('truncates strings longer than truncate (6)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 6 })).to.equal('/…/gim')
    })

    it('disregards truncate when it cannot truncate further (5)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 5 })).to.equal('/…/gim')
    })

    it('disregards truncate when it cannot truncate further (4)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 4 })).to.equal('/…/gim')
    })

    it('disregards truncate when it cannot truncate further (3)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 3 })).to.equal('/…/gim')
    })

    it('disregards truncate when it cannot truncate further (2)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 2 })).to.equal('/…/gim')
    })

    it('disregards truncate when it cannot truncate further (1)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 1 })).to.equal('/…/gim')
    })

    it('disregards truncate when it cannot truncate further (0)', () => {
      expect(inspect(/foobarbaz/gim, { truncate: 0 })).to.equal('/…/gim')
    })
  })
})
