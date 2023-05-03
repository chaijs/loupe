import inspect from '../lib/index.js'
import {expect} from 'chai'
describe('booleans', () => {
  it('returns `false` for false', () => {
    expect(inspect(false)).to.equal('false')
    expect(inspect(true)).to.equal('true')
    expect(inspect(new Boolean(1))).to.equal('true')
    expect(inspect(new Boolean(false))).to.equal('false')
  })

  it('returns `true` for true', () => {
    expect(inspect(false)).to.equal('false')
    expect(inspect(true)).to.equal('true')
  })

  describe('colors', () => {
    it('returns string with yellow color, if colour is set to true', () => {
      expect(inspect(false, { colors: true })).to.equal('\u001b[33mfalse\u001b[39m')
      expect(inspect(true, { colors: true })).to.equal('\u001b[33mtrue\u001b[39m')
    })
  })

  describe('truncated', () => {
    it('returns the full string representation regardless of truncate', () => {
      expect(inspect(true, { truncate: 5 })).to.equal('true')
      expect(inspect(true, { truncate: 4 })).to.equal('true')
      expect(inspect(true, { truncate: 3 })).to.equal('true')
      expect(inspect(true, { truncate: 2 })).to.equal('true')
      expect(inspect(true, { truncate: 1 })).to.equal('true')
      expect(inspect(false, { truncate: 5 })).to.equal('false')
      expect(inspect(false, { truncate: 4 })).to.equal('false')
      expect(inspect(false, { truncate: 3 })).to.equal('false')
      expect(inspect(false, { truncate: 2 })).to.equal('false')
      expect(inspect(false, { truncate: 1 })).to.equal('false')
    })
  })
})
