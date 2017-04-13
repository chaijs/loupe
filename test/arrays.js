import inspect from '../index'
import { expect } from 'chai'
describe('arrays', () => {
  it('returns `[]` for empty arrays', () => {
    expect(inspect([])).to.equal('[]')
  })

  describe('truncate', () => {
    it('returns the full representation when truncate is over string length', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 17 })).to.equal("[ 'a', 'b', 'c' ]")
    })

    it('truncates array values longer than truncate (14)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 14 })).to.equal("[ 'a', …(2) ]")
    })

    it('truncates array values longer than truncate (13)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 13 })).to.equal("[ 'a', …(2) ]")
    })

    it('truncates array values longer than truncate (12)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 12 })).to.equal('[ …(3) ]')
    })

    it('truncates array values longer than truncate (11)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 11 })).to.equal('[ …(3) ]')
    })

    it('truncates array values longer than truncate (10)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 10 })).to.equal('[ …(3) ]')
    })

    it('truncates array values longer than truncate (9)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 9 })).to.equal('[ …(3) ]')
    })

    it('truncates array values longer than truncate (8)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 8 })).to.equal('[ …(3) ]')
    })

    it('truncates array values longer than truncate (7)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 7 })).to.equal('[ …(3) ]')
    })

    it('truncates array values longer than truncate (6)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 6 })).to.equal('[ …(3) ]')
    })

    it('truncates array values longer than truncate (5)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 5 })).to.equal('[ …(3) ]')
    })

    it('truncates array values longer than truncate (4)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 4 })).to.equal('[ …(3) ]')
    })

    it('truncates whole array if truncate 3 or less (3)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 3 })).to.equal('[ …(3) ]')
    })

    it('truncates whole array if truncate 3 or less (2)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 2 })).to.equal('[ …(3) ]')
    })

    it('truncates whole array if truncate 3 or less (1)', () => {
      expect(inspect(['a', 'b', 'c'], { truncate: 1 })).to.equal('[ …(3) ]')
    })
  })

  describe('non-integer properties', () => {
    it('outputs non-integer properties right after standard list items', () => {
      const arr = ['a', 'b', 'c']
      arr.foo = 'bar'
      expect(inspect(arr)).to.equal("[ 'a', 'b', 'c', foo: 'bar' ]")
    })
  })

})
