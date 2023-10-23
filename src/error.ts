import { inspectList, inspectProperty, truncate } from './helpers.js'
import type { Inspect, Options } from './types.js'

const errorKeys = [
  'stack',
  'line',
  'column',
  'name',
  'message',
  'fileName',
  'lineNumber',
  'columnNumber',
  'number',
  'description',
  'sourceURL'
]

export default function inspectObject(error: Error, options: Options) {
  const properties = Object.getOwnPropertyNames(error).filter(key => errorKeys.indexOf(key) === -1)
  const name = error.name
  options.truncate -= name.length
  let message = ''
  if (typeof error.message === 'string') {
    message = truncate(error.message, options.truncate)
  } else {
    properties.unshift('message')
  }
  message = message ? `: ${message}` : ''
  options.truncate -= message.length + 5
  const propertyContents = inspectList(
    properties.map(key => [key, error[key as keyof typeof error]]),
    options,
    inspectProperty as Inspect
  )
  return `${name}${message}${propertyContents ? ` { ${propertyContents} }` : ''}`
}
