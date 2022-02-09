import loupe from '../index'
import { expect } from 'chai'

for (const [suite, inspect] of Object.entries({
  objects: loupe,
  'objects (Object.create(null))': (obj, ...rest) => loupe(Object.assign(Object.create(null), obj), ...rest),
})) {
  describe(suite, () => {
    it('returns `{}` for empty objects', () => {
      expect(inspect({})).to.equal('{}')
    })

    it('quotes a key if it contains special chars', () => {
      expect(inspect({ 'a.b': 1 })).to.equal("{ 'a.b': 1 }")
      expect(inspect({ 'a b': 1 })).to.equal("{ 'a b': 1 }")
    })

    it('quotes a key if it is empty', () => {
      expect(inspect({ '': 1 })).to.equal("{ '': 1 }")
    })

    it('quotes a key if it contains a single quote', () => {
      expect(inspect({ "'": 1 })).to.equal("{ '\\'': 1 }")
    })

    it('quotes a key if it contains a double quote', () => {
      expect(inspect({ '"': 1 })).to.equal("{ '\"': 1 }")
    })

    if (suite === 'objects') {
      it('detects circular references', () => {
        const main = {}
        main.a = main
        expect(inspect(main)).to.equal('{ a: [Circular] }')
      })
    }

    it('returns `{}` for empty objects with an anonoymous prototype', () => {
      expect(inspect(Object.create({ a: 1 }))).to.equal('{}')
    })

    it('returns `{}` for empty objects with a null prototype', () => {
      expect(inspect(Object.create(Object.create(null)))).to.equal('{}')
    })

    it("shows objects' own properties for objects with an anonoymous prototype", () => {
      const obj = Object.create({ a: 1 })
      obj.b = 2
      expect(inspect(obj)).to.equal('{ b: 2 }')
    })

    describe('truncate', () => {
      it('returns the full representation when truncate is over string length', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 20 })).to.equal('{ a: 1, b: 2, c: 3 }')
      })

      it('truncates object values longer than truncate (19)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 19 })).to.equal('{ a: 1, …(2) }')
      })

      it('truncates object values longer than truncate (18)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 18 })).to.equal('{ a: 1, …(2) }')
      })

      it('truncates object values longer than truncate (17)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 17 })).to.equal('{ a: 1, …(2) }')
      })

      it('truncates object values longer than truncate (16)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 16 })).to.equal('{ a: 1, …(2) }')
      })

      it('truncates object values longer than truncate (15)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 15 })).to.equal('{ a: 1, …(2) }')
      })

      it('truncates object values longer than truncate (14)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 14 })).to.equal('{ a: 1, …(2) }')
      })

      it('truncates object values longer than truncate (13)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 13 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (12)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 12 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (11)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 11 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (10)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 10 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (9)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 9 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (8)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 8 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (7)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 7 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (6)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 6 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (5)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 5 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (4)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 4 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (3)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 3 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (2)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 2 })).to.equal('{ …(3) }')
      })

      it('truncates object values longer than truncate (1)', () => {
        expect(inspect({ a: 1, b: 2, c: 3 }, { truncate: 1 })).to.equal('{ …(3) }')
      })
    })
  })
}
