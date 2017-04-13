import { truncate, inspectList, inspectProperty } from './helpers'

export default function inspectObject(error, options) {
  const properties = Object.getOwnPropertyNames(error).filter(
    key => key !== 'stack' && key !== 'line' && key !== 'column' && key !== 'name' && key !== 'message'
  )
  const name = error.name
  options = Object.assign({}, options)
  options.truncate -= name.length
  let message = ''
  if (typeof error.message === 'string') {
    message = truncate(error.message, options.truncate)
  } else {
    message = options.inspect(error.message, options)
  }
  message = message ? `: ${message}` : ''
  options.truncate -= message.length + 5
  const propertyContents = inspectList(properties.map(key => [key, error[key]]), options, inspectProperty)
  return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ''}`
}
