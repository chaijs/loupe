/* !
 * loupe
 * Copyright(c) 2013 Jake Luer <jake@alogicalparadox.com>
 * MIT Licensed
 */

import inspectArray from './lib/array.js'
import inspectTypedArray from './lib/typedarray.js'
import inspectDate from './lib/date.js'
import inspectFunction from './lib/function.js'
import inspectMap from './lib/map.js'
import inspectNumber from './lib/number.js'
import inspectBigInt from './lib/bigint.js'
import inspectRegExp from './lib/regexp.js'
import inspectSet from './lib/set.js'
import inspectString from './lib/string.js'
import inspectSymbol from './lib/symbol.js'
import inspectPromise from './lib/promise.js'
import inspectClass from './lib/class.js'
import inspectObject from './lib/object.js'
import inspectArguments from './lib/arguments.js'
import inspectError from './lib/error.js'
import inspectHTMLElement, { inspectHTMLCollection } from './lib/html.js'

import { normaliseOptions } from './lib/helpers.js'

const symbolsSupported = typeof Symbol === 'function' && typeof Symbol.for === 'function'
const chaiInspect = symbolsSupported ? Symbol.for('chai/inspect') : '@@chai/inspect'
let nodeInspect = false
try {
  // eslint-disable-next-line global-require
  const nodeUtil = require('util')
  nodeInspect = nodeUtil.inspect ? nodeUtil.inspect.custom : false
} catch (noNodeInspect) {
  nodeInspect = false
}

const constructorMap = new WeakMap()
const stringTagMap = {}
const baseTypesMap = {
  undefined: (value, options) => options.stylize('undefined', 'undefined'),
  null: (value, options) => options.stylize(null, 'null'),

  boolean: (value, options) => options.stylize(value, 'boolean'),
  Boolean: (value, options) => options.stylize(value, 'boolean'),

  number: inspectNumber,
  Number: inspectNumber,

  bigint: inspectBigInt,
  BigInt: inspectBigInt,

  string: inspectString,
  String: inspectString,

  function: inspectFunction,
  Function: inspectFunction,

  symbol: inspectSymbol,
  // A Symbol polyfill will return `Symbol` not `symbol` from typedetect
  Symbol: inspectSymbol,

  Array: inspectArray,
  Date: inspectDate,
  Map: inspectMap,
  Set: inspectSet,
  RegExp: inspectRegExp,
  Promise: inspectPromise,

  // WeakSet, WeakMap are totally opaque to us
  WeakSet: (value, options) => options.stylize('WeakSet{…}', 'special'),
  WeakMap: (value, options) => options.stylize('WeakMap{…}', 'special'),

  Arguments: inspectArguments,
  Int8Array: inspectTypedArray,
  Uint8Array: inspectTypedArray,
  Uint8ClampedArray: inspectTypedArray,
  Int16Array: inspectTypedArray,
  Uint16Array: inspectTypedArray,
  Int32Array: inspectTypedArray,
  Uint32Array: inspectTypedArray,
  Float32Array: inspectTypedArray,
  Float64Array: inspectTypedArray,

  Generator: () => '',
  DataView: () => '',
  ArrayBuffer: () => '',

  Error: inspectError,

  HTMLCollection: inspectHTMLCollection,
  NodeList: inspectHTMLCollection,
}

// eslint-disable-next-line complexity
const inspectCustom = (value, options, type) => {
  if (chaiInspect in value && typeof value[chaiInspect] === 'function') {
    return value[chaiInspect](options)
  }

  if (nodeInspect && nodeInspect in value && typeof value[nodeInspect] === 'function') {
    return value[nodeInspect](options.depth, options)
  }

  if ('inspect' in value && typeof value.inspect === 'function') {
    return value.inspect(options.depth, options)
  }

  if ('constructor' in value && constructorMap.has(value.constructor)) {
    return constructorMap.get(value.constructor)(value, options)
  }

  if (stringTagMap[type]) {
    return stringTagMap[type](value, options)
  }

  return ''
}

const toString = Object.prototype.toString

// eslint-disable-next-line complexity
export function inspect(value, options) {
  options = normaliseOptions(options)
  options.inspect = inspect
  const { customInspect } = options
  let type = value === null ? 'null' : typeof value
  if (type === 'object') {
    type = toString.call(value).slice(8, -1)
  }

  // If it is a base value that we already support, then use Loupe's inspector
  if (baseTypesMap[type]) {
    return baseTypesMap[type](value, options)
  }

  // If `options.customInspect` is set to true then try to use the custom inspector
  if (customInspect && value) {
    const output = inspectCustom(value, options, type)
    if (output) {
      if (typeof output === 'string') return output
      return inspect(output, options)
    }
  }

  const proto = value ? Object.getPrototypeOf(value) : false
  // If it's a plain Object then use Loupe's inspector
  if (proto === Object.prototype || proto === null) {
    return inspectObject(value, options)
  }

  // Specifically account for HTMLElements
  // eslint-disable-next-line no-undef
  if (value && typeof HTMLElement === 'function' && value instanceof HTMLElement) {
    return inspectHTMLElement(value, options)
  }

  if ('constructor' in value) {
    // If it is a class, inspect it like an object but add the constructor name
    if (value.constructor !== Object) {
      return inspectClass(value, options)
    }

    // If it is an object with an anonymous prototype, display it as an object.
    return inspectObject(value, options)
  }

  // last chance to check if it's an object
  if (value === Object(value)) {
    return inspectObject(value, options)
  }

  // We have run out of options! Just stringify the value
  return options.stylize(String(value), type)
}

export function registerConstructor(constructor, inspector) {
  if (constructorMap.has(constructor)) {
    return false
  }
  constructorMap.set(constructor, inspector)
  return true
}

export function registerStringTag(stringTag, inspector) {
  if (stringTag in stringTagMap) {
    return false
  }
  stringTagMap[stringTag] = inspector
  return true
}

export const custom = chaiInspect

export default inspect
