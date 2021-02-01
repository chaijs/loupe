import inspect from '../index'
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
    expect(inspect({foo: 1, [Symbol('foo')]: 1})).to.equal('{ foo: 1, [Symbol(foo)]: 1 }')
  })

  it('does not use custom inspect functions if `customInspect` is turned off', () => {
    const obj = {
      'inspect': () => 1
    }
    expect(inspect(obj, { customInspect: false })).to.equal('{ inspect: [Function inspect] }')
  })
  
  it('uses custom inspect function is `customInspect` is turned on', () => {
    const obj = {
      'inspect': () => 1
    }
    expect(inspect(obj, { customInspect: true })).to.equal(1)
  })
})
