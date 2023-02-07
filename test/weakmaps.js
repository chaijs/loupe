import inspect from '../index.js'
import pkg from 'chai'
const { expect } = pkg
describe('weakmaps', () => {
  it('returns `WeakMap{…}` for WeakMap', () => {
    expect(inspect(new WeakMap())).to.equal('WeakMap{…}')
  })

  describe('truncate', () => {
    it('returns the full representation when truncate is over string length', () => {
      expect(inspect(new WeakMap(), { truncate: 20 })).to.equal('WeakMap{…}')
      expect(inspect(new WeakMap(), { truncate: 10 })).to.equal('WeakMap{…}')
      expect(inspect(new WeakMap(), { truncate: 1 })).to.equal('WeakMap{…}')
    })
  })
})
