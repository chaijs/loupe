import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('arrays', () => {
  it('truncates an array of strings rather than just the strings', () => {
    expect(inspect(['foo', 'bar', 'baz', 'bing'], { truncate: 22 })).to.equal("[ 'foo', 'bar', …(2) ]")
  })

  it('truncates the string in certain cases, to keep under the truncate threshold', () => {
    expect(inspect(['foobarbazbing'], { truncate: 15 })).to.equal("[ 'foobarba…' ]")
  })
})

describe('objects', () => {
  it('correctly inspects Symbols as object keys', () => {
    expect(inspect({ [Symbol('foo')]: 1 })).to.equal('{ [Symbol(foo)]: 1 }')
  })

  it('correctly inspects properties and Symbols as object keys', () => {
    expect(inspect({ foo: 1, [Symbol('foo')]: 1 })).to.equal('{ foo: 1, [Symbol(foo)]: 1 }')
  })

  it('does not treat inspect members as inspect functions', () => {
    const obj = {
      inspect: () => 1,
    }
    expect(inspect(obj)).to.equal('{ inspect: [Function inspect] }')
  })

  it('does not use custom inspect functions if `customInspect` is turned off', () => {
    const obj = {
      [Symbol.for('nodejs.util.inspect.custom')]: () => 1,
    }
    expect(inspect(obj, { customInspect: false })).to.equal(
      '{ [Symbol(nodejs.util.inspect.custom)]: [Function [nodejs.util.inspect.custom]] }'
    )
  })

  it('uses custom inspect function if `customInspect` is turned on', () => {
    const obj = {
      [Symbol.for('nodejs.util.inspect.custom')]: () => 1,
    }
    expect(inspect(obj, { customInspect: true })).to.equal('1')
  })

  it('inspects custom inspect function result', () => {
    const obj = {
      [Symbol.for('nodejs.util.inspect.custom')]: () => ['foobarbazbing'],
    }
    expect(inspect(obj, { customInspect: true, truncate: 15 })).to.equal("[ 'foobarba…' ]")
  })

  it('uses a custom deeply nested inspect function if `customInspect` is turned on', () => {
    const obj = {
      sub: {
        [Symbol.for('nodejs.util.inspect.custom')]: (depth, options) => options.stylize('Object content', 'string'),
      },
    }
    expect(inspect(obj, { customInspect: true })).to.equal('{ sub: Object content }')
  })

  it('inspect with custom object-returning inspect', () => {
    const obj = {
      sub: {
        [Symbol.for('nodejs.util.inspect.custom')]: () => ({ foo: 'bar' }),
      },
    }

    expect(inspect(obj, { customInspect: true })).to.equal("{ sub: { foo: 'bar' } }")
  })

  it('inspect with node-style custom inspect', () => {
    const obj = {
      sub: {
        [Symbol.for('nodejs.util.inspect.custom')]: (depth, options, inspect) =>
          `Foo { depth=${depth}, foo=${inspect(['bar', 1])} } }`,
      },
    }

    expect(inspect(obj, { customInspect: true })).to.equal("{ sub: Foo { depth=2, foo=[ 'bar', 1 ] } } }")
  })
})

describe('arrays', () => {
  it('can contain anonymous functions', () => {
    expect(inspect([() => 1])).to.equal('[ [Function] ]')
  })
})
