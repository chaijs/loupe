import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('undefined', () => {
  it('returns `undefined`', () => {
    expect(inspect(undefined)).to.equal('undefined')
  })

  describe('colors', () => {
    it('returns string with grey color, if colour is set to true', () => {
      expect(inspect(undefined, { colors: true })).to.equal('\u001b[90mundefined\u001b[39m')
    })
  })

  describe('truncate', () => {
    it('returns the full string representation regardless of truncate', () => {
      expect(inspect(undefined, { truncate: 9 })).to.equal('undefined')
      expect(inspect(undefined, { truncate: 8 })).to.equal('undefined')
      expect(inspect(undefined, { truncate: 7 })).to.equal('undefined')
      expect(inspect(undefined, { truncate: 6 })).to.equal('undefined')
      expect(inspect(undefined, { truncate: 5 })).to.equal('undefined')
      expect(inspect(undefined, { truncate: 4 })).to.equal('undefined')
      expect(inspect(undefined, { truncate: 3 })).to.equal('undefined')
      expect(inspect(undefined, { truncate: 2 })).to.equal('undefined')
      expect(inspect(undefined, { truncate: 1 })).to.equal('undefined')
    })
  })
})
