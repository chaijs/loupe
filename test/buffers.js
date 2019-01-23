import inspect from '../index'
import { expect } from 'chai'
describe('buffers', () => {
  beforeEach(function() {
    if (typeof Buffer !== 'function') {
      // eslint-disable-next-line no-invalid-this
      this.skip()
    }
  })

  it('returns `Buffer[]` for empty arrays', () => {
    expect(inspect(Buffer.from(''))).to.equal('Buffer[]')
  })

  describe('truncate', () => {
    it('returns the full representation when truncate is over string length', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 21 })).to.equal('Buffer[ 1, 2, 3 ]')
    })

    it('truncates array values longer than truncate (20)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 20 })).to.equal('Buffer[ 1, 2, 3 ]')
    })

    it('truncates array values longer than truncate (19)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 19 })).to.equal('Buffer[ 1, …(2) ]')
    })

    it('truncates array values longer than truncate (18)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 18 })).to.equal('Buffer[ 1, …(2) ]')
    })

    it('truncates array values longer than truncate (17)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 17 })).to.equal('Buffer[ 1, …(2) ]')
    })

    it('truncates array values longer than truncate (16)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 16 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (15)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 15 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (14)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 14 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (13)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 13 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (12)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 12 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (11)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 11 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (10)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 10 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (9)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 9 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (8)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 8 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (8)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 8 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (8)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 8 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (7)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 7 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (6)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 6 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (5)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 5 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (4)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 4 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (3)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 3 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (2)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 2 })).to.equal('Buffer[ …(3) ]')
    })

    it('truncates array values longer than truncate (1)', () => {
      expect(inspect(Buffer.from([1, 2, 3]), { truncate: 1 })).to.equal('Buffer[ …(3) ]')
    })
  })
})
