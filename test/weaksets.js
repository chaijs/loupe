import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('weaksets', () => {
  it('returns `WeakSet{…}` for WeakSet', () => {
    expect(inspect(new WeakSet())).to.equal('WeakSet{…}')
  })

  describe('truncate', () => {
    it('returns the full representation when truncate is over string length', () => {
      expect(inspect(new WeakSet(), { truncate: 20 })).to.equal('WeakSet{…}')
      expect(inspect(new WeakSet(), { truncate: 10 })).to.equal('WeakSet{…}')
      expect(inspect(new WeakSet(), { truncate: 1 })).to.equal('WeakSet{…}')
    })
  })
})
