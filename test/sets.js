import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('sets', () => {
  it('returns `Set{}` for empty sets', () => {
    expect(inspect(new Set())).to.equal('Set{}')
  })

  describe('truncate', () => {
    it('returns the full representation when truncate is over string length', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 20 })).to.equal("Set{ 'a', 'b', 'c' }")
    })

    it('truncates set values longer than truncate (19)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 19 })).to.equal("Set{ 'a', …(2) }")
    })

    it('truncates set values longer than truncate (18)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 18 })).to.equal("Set{ 'a', …(2) }")
    })

    it('truncates set values longer than truncate (17)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 17 })).to.equal("Set{ 'a', …(2) }")
    })

    it('truncates set values longer than truncate (16)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 16 })).to.equal("Set{ 'a', …(2) }")
    })

    it('truncates set values longer than truncate (15)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 15 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (14)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 14 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (13)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 13 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (12)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 12 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (11)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 11 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (10)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 10 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (9)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 9 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (8)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 8 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (7)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 7 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (6)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 6 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (5)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 5 })).to.equal('Set{ …(3) }')
    })

    it('truncates set values longer than truncate (4)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 4 })).to.equal('Set{ …(3) }')
    })

    it('truncates whole array if truncate 3 or less (3)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 3 })).to.equal('Set{ …(3) }')
    })

    it('truncates whole array if truncate 3 or less (2)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 2 })).to.equal('Set{ …(3) }')
    })

    it('truncates whole array if truncate 3 or less (1)', () => {
      expect(inspect(new Set(['a', 'b', 'c']), { truncate: 1 })).to.equal('Set{ …(3) }')
    })
  })
})
