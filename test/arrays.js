import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('arrays', () => {
  it('returns `[]` for empty arrays', () => {
    expect(inspect([])).to.equal('[]')
  })

  describe('circular references', () => {
    it('detects an array containing itself', () => {
      const array = []
      array.push(array)
      expect(inspect(array)).to.equal('[ [Circular] ]')
    })

    it('detects a cycle through an object', () => {
      const array = []
      array.push({ parent: array })
      expect(inspect(array)).to.equal('[ { parent: [Circular] } ]')
    })

    it('detects a circular non-index property', () => {
      const array = [1]
      array.self = array
      expect(inspect(array)).to.equal('[ 1, self: [Circular] ]')
    })

    it('does not treat repeated non-circular arrays as circular', () => {
      const child = [1]
      expect(inspect([child, child])).to.equal('[ [ 1 ], [ 1 ] ]')
    })

    it('restores the seen list if inspecting an element throws', () => {
      const seen = []
      const error = new Error('cannot inspect value')
      const array = [{}]
      Object.defineProperty(array[0], 'value', {
        get() {
          throw error
        },
      })
      expect(() => inspect(array, { seen })).to.throw(error)
      expect(seen).to.deep.equal([])
    })
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
