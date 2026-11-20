import inspect from '../lib/index.js'
import { expect } from 'chai'

describe('depth', () => {
  it('counts nested values, starting at zero for the root', () => {
    const value = { a: { b: { c: { d: 1 } } } }
    expect(inspect(value, { depth: -1 })).to.equal('[Object]')
    expect(inspect(value, { depth: 0 })).to.equal('{ a: [Object] }')
    expect(inspect(value, { depth: 1 })).to.equal('{ a: { b: [Object] } }')
    expect(inspect(value)).to.equal('{ a: { b: { c: [Object] } } }')
    expect(inspect(value, { depth: Infinity })).to.equal('{ a: { b: { c: { d: 1 } } } }')
  })

  it('counts map keys and values once, without counting the entry tuple', () => {
    const value = new Map([[{ key: { a: 1 } }, { value: { b: 2 } }]])
    expect(inspect(value, { depth: 0 })).to.equal('Map{ [Object] => [Object] }')
    expect(inspect(value, { depth: 1 })).to.equal('Map{ { key: [Object] } => { value: [Object] } }')
  })

  it('bounds array, set, arguments and typed-array properties', () => {
    const args = (function () {
      return arguments
    })({ nested: 1 })
    const typed = new Uint8Array([1])
    typed.extra = { nested: 1 }
    expect(inspect([[1]], { depth: 0 })).to.equal('[ [Array] ]')
    expect(inspect(new Set([{ a: 1 }]), { depth: 0 })).to.equal('Set{ [Object] }')
    expect(inspect(args, { depth: 0 })).to.equal('Arguments[ [Object] ]')
    expect(inspect(typed, { depth: 0 })).to.equal('Uint8Array[ 1, extra: [Object] ]')
  })

  it('preserves the type of values beyond the limit', () => {
    class Example {}
    const args = (function () {
      return arguments
    })()
    const values = [{}, [], new Map(), new Set(), args, new Uint8Array(), new Example(), new Error('message')]
    const expected = ['[Object]', '[Array]', '[Map]', '[Set]', '[Arguments]', '[Uint8Array]', '[Example]', '[Error]']
    for (let i = 0; i < values.length; i++) {
      expect(inspect(values[i], { depth: -1 })).to.equal(expected[i])
    }
  })

  it('keeps leaf values visible at negative depths', () => {
    expect(inspect([1, 'a', null, true, /a/g], { depth: 0 })).to.equal("[ 1, 'a', null, true, /a/g ]")
    expect(inspect(new Date('2020-01-01T00:00:00Z'), { depth: -1 })).to.equal('2020-01-01T00:00:00.000Z')
    expect(inspect(function example() {}, { depth: -1 })).to.equal('[Function example]')
    expect(inspect(Promise.resolve(1), { depth: -1 })).to.equal('Promise{…}')
  })

  it('does not read properties or enumerate values below the limit', () => {
    const value = new Proxy(
      {},
      {
        ownKeys() {
          throw new Error('enumerated beyond the depth limit')
        },
      }
    )
    expect(inspect({ value }, { depth: 0 })).to.equal('{ value: [Object] }')
    const array = []
    Object.defineProperty(array, '0', {
      get() {
        throw new Error('read beyond the depth limit')
      },
    })
    expect(inspect({ array }, { depth: 0 })).to.equal('{ array: [Array] }')
  })

  it('does not traverse specialized containers below the limit', () => {
    const fail = () => {
      throw new Error('read beyond the depth limit')
    }
    const map = new Map([[1, 2]])
    map.forEach = fail
    const set = new Set([1])
    set.forEach = fail
    class Example {}
    const instance = Object.defineProperty(new Example(), 'child', { get: fail })
    const error = Object.defineProperty(new Error(), 'name', { get: fail })
    const typed = Object.defineProperty(new Uint8Array([1]), 'child', { get: fail, enumerable: true })
    expect(inspect({ map, set, instance, error, typed }, { depth: 0 })).to.equal(
      '{ map: [Map], set: [Set], instance: [Example], error: [Error], typed: [Uint8Array] }'
    )
  })

  it('can inspect a deeply nested value without exhausting the stack', () => {
    let value = { leaf: 1 }
    for (let i = 0; i < 10000; i++) value = { child: value }
    expect(inspect(value)).to.equal('{ child: { child: { child: [Object] } } }')
  })

  it('restores the depth for shared references and sibling values', () => {
    const shared = { child: { leaf: 1 } }
    expect(inspect({ first: shared, second: shared }, { depth: 1 })).to.equal(
      '{ first: { child: [Object] }, second: { child: [Object] } }'
    )
    expect(inspect([shared, shared], { depth: 1 })).to.equal('[ { child: [Object] }, { child: [Object] } ]')
  })

  it('preserves object circular markers and terminates recursive collections at finite depth', () => {
    const object = {}
    object.self = object
    expect(inspect(object, { depth: 0 })).to.equal('{ self: [Circular] }')
    const array = []
    array.push(array)
    expect(inspect(array, { depth: 0 })).to.equal('[ [Array] ]')
    const map = new Map()
    map.set('self', map)
    expect(inspect(map, { depth: 0 })).to.equal("Map{ 'self' => [Map] }")
    const set = new Set()
    set.add(set)
    expect(inspect(set, { depth: 0 })).to.equal('Set{ [Set] }')
  })

  it('preserves class circular markers at the depth limit', () => {
    class Example {}
    const instance = new Example()
    instance.self = instance
    expect(inspect(instance, { depth: 0 })).to.equal('Example{ self: Example[Circular] }')
  })

  it('preserves error circular markers at the depth limit', () => {
    const error = new Error('message')
    error.self = error
    expect(inspect(error, { depth: 0 })).to.equal('Error: message { self: [Circular] }')
  })

  it('passes the remaining depth to custom inspectors', () => {
    const custom = Symbol.for('nodejs.util.inspect.custom')
    const value = { [custom]: depth => `remaining=${depth}` }
    expect(inspect({ value }, { depth: 2 })).to.equal('{ value: remaining=1 }')
    expect(inspect({ value }, { depth: 0 })).to.equal('{ value: remaining=-1 }')
  })

  it('inspects a custom replacement at the same depth as the original value', () => {
    const value = { [Symbol.for('chai/inspect')]: () => ({ nested: { leaf: 1 } }) }
    expect(inspect({ value }, { depth: 1 })).to.equal('{ value: { nested: [Object] } }')
    expect(inspect({ value }, { depth: 0 })).to.equal('{ value: [Object] }')
  })

  it('combines depth summaries with colors and truncation', () => {
    expect(inspect({}, { depth: -1, colors: true })).to.equal('\u001b[36m[Object]\u001b[39m')
    expect(inspect([{ a: 1 }, { b: 2 }, { c: 3 }], { depth: 0, truncate: 18 })).to.equal('[ [Object], …(2) ]')
  })
})
