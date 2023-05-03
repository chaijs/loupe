import inspect from '../src/index.ts'
import {expect} from 'chai'

for (const TypedArray of [Uint8Array, Uint16Array, Uint32Array, Uint8ClampedArray]) {
  describe('typed arrays', () => {
    it(`returns \`${TypedArray.name}[]\` for empty arrays`, () => {
      expect(inspect(new TypedArray())).to.equal(`${TypedArray.name}[]`)
    })

    describe('truncate', () => {
      it('returns the full representation when truncate is over string length', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 40 })).to.equal(`${TypedArray.name}[ 1, 2, 3 ]`)
      })

      it('truncates array values longer than truncate (20)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 20 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (19)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 19 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (18)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 18 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (17)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 17 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (16)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 16 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (15)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 15 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (14)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 14 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (13)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 13 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (12)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 12 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (11)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 11 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (10)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 10 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (9)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 9 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (8)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 8 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (8)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 8 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (8)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 8 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (7)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 7 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (6)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 6 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (5)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 5 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (4)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 4 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (3)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 3 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (2)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 2 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })

      it('truncates array values longer than truncate (1)', () => {
        expect(inspect(new TypedArray([1, 2, 3]), { truncate: 1 })).to.equal(`${TypedArray.name}[ …(3) ]`)
      })
    })

    describe('non-integer properties', () => {
      it('outputs non-integer properties right after standard list items', () => {
        const arr = new TypedArray([1, 2, 3])
        arr.foo = 'bar'
        expect(inspect(arr)).to.equal(`${TypedArray.name}[ 1, 2, 3, foo: 'bar' ]`)
      })
    })
  })
}
