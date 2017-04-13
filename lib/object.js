import { inspectProperty, inspectList } from './helpers'

export default function inspectObject(object, options) {
  const properties = Object.getOwnPropertyNames(object)
  if (properties.length === 0) {
    return '{}'
  }
  options = Object.assign({}, options)
  options.truncate -= 4
  const propertyContents = inspectList(properties.map(key => [key, object[key]]), options, inspectProperty)
  return `{ ${propertyContents} }`
}
