import { inspectList, inspectProperty } from './helpers.js'
import type { Inspect, Options } from './types.js'

export default function inspectArray(array: ArrayLike<unknown>, options: Options) {
  // Object.keys will always output the Array indices first, so we can slice by
  // `array.length` to get non-index properties
  const nonIndexProperties = Object.keys(array).slice(array.length)
  if (!array.length && !nonIndexProperties.length) return '[]'
  options.truncate -= 4
  options.seen = options.seen || []
  const seen = options.seen
  if (seen.includes(array)) return '[Circular]'
  const seenLength = seen.length
  seen.push(array)
  try {
    const listContents = inspectList(array, options)
    options.truncate -= listContents.length
    let propertyContents = ''
    if (nonIndexProperties.length) {
      propertyContents = inspectList(
        nonIndexProperties.map(key => [key, array[key as keyof typeof array]]),
        options,
        inspectProperty as Inspect
      )
    }
    return `[ ${listContents}${propertyContents ? `, ${propertyContents}` : ''} ]`
  } finally {
    seen.length = seenLength
  }
}
