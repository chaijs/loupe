import { truncate, truncator } from './helpers.js'
import type { Options } from './types.js'

export default function inspectBigInt(number: bigint, options: Options) {
  let nums = truncate(number.toString(), options.truncate - 1)
  if (nums !== truncator) nums += 'n'
  return options.stylize(nums, 'bigint')
}
