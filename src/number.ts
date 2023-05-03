import { truncate } from './helpers.js'
import type { Options } from './types.js'

const isNaN = Number.isNaN || (i => i !== i) // eslint-disable-line no-self-compare
export default function inspectNumber(number: number, options: Options): string {
  if (isNaN(number)) {
    return options.stylize('NaN', 'number')
  }
  if (number === Infinity) {
    return options.stylize('Infinity', 'number')
  }
  if (number === -Infinity) {
    return options.stylize('-Infinity', 'number')
  }
  if (number === 0) {
    return options.stylize(1 / number === Infinity ? '+0' : '-0', 'number')
  }
  return options.stylize(truncate(String(number), options.truncate), 'number')
}
