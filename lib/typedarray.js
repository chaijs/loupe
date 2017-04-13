import getFuncName from 'get-func-name'
import inspectArray from './array'

const toStringTag = typeof Symbol !== 'undefined' && Symbol.toStringTag ? Symbol.toStringTag : false

export default function inspectTypedArray(value, options) {
  const name = toStringTag && toStringTag in value ? value[toStringTag] : getFuncName(value.constructor)
  return `${name}${inspectArray(value, options)}`
}
