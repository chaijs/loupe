import inspect from '../index'
import { expect } from 'chai'
describe('classes', () => {
  class Foo {}
  it('returns constructor name with object literal notation for an empty class', () => {
    expect(inspect(new Foo())).to.equal('Foo{}')
  })

  it('returns `<Anonymous Class>{}` for anonymous classes', () => {
    const anon = () => class {}
    expect(inspect(new (anon())())).to.equal('<Anonymous Class>{}')
  })

  it('returns toStringTag value as name if present', () => {
    class Bar {
      get [Symbol.toStringTag]() {
        return 'Baz'
      }
    }
    const bar = new Bar()
    expect(inspect(bar)).to.equal('Baz{}')
  })

  describe('properties', () => {
    it('inspects and outputs properties ', () => {
      const foo = new Foo()
      foo.bar = 1
      foo.baz = 'hello'
      expect(inspect(foo)).to.equal("Foo{ bar: 1, baz: 'hello' }")
    })

    it('inspects and outputs Symbols', () => {
      const foo = new Foo()
      foo[Symbol('foo')] = 1
      expect(inspect(foo)).to.equal('Foo{ [Symbol(foo)]: 1 }')
    })
  })
})
