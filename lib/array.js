import { inspectProperty, inspectList } from './helpers'

export default function inspectArray(array, options) {
  if (array.length === 0) return '[]'
  options = Object.assign({}, options)
  options.truncate -= 4
  const listContents = inspectList(array, options)
  options.truncate -= listContents.length
  const nonIndexProperties = Object.getOwnPropertyNames(array).filter(key => {
    return Number(key) >= array.length || key !== 'length'
    if (key === 'length') return false
    return true
  })
  const propertyContents = inspectList(nonIndexProperties.map(key => [key, array[key]]), options, inspectProperty)
  return `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ''} ]`
}
