import inspect from '../index.js'
import pkg from 'chai'
const { expect } = pkg
describe('null', () => {
  it('returns `null`', () => {
    expect(inspect(null)).to.equal('null')
  })

  describe('colors', () => {
    it('returns string with bold color, if colour is set to true', () => {
      expect(inspect(null, { colors: true })).to.equal('\u001b[1mnull\u001b[22m')
    })
  })

  describe('truncate', () => {
    it('returns the full string representation regardless of truncate', () => {
      expect(inspect(null, { truncate: 9 })).to.equal('null')
      expect(inspect(null, { truncate: 8 })).to.equal('null')
      expect(inspect(null, { truncate: 7 })).to.equal('null')
      expect(inspect(null, { truncate: 6 })).to.equal('null')
      expect(inspect(null, { truncate: 5 })).to.equal('null')
      expect(inspect(null, { truncate: 4 })).to.equal('null')
      expect(inspect(null, { truncate: 3 })).to.equal('null')
      expect(inspect(null, { truncate: 2 })).to.equal('null')
      expect(inspect(null, { truncate: 1 })).to.equal('null')
    })
  })
})
