import { truncate, truncator } from './helpers.ts'
import type { Options } from './types.ts'

export default function inspectBigInt(number: bigint, options: Options) {
  let nums = truncate(number.toString(), options.truncate - 1)
  if (nums !== truncator) nums += 'n'
  return options.stylize(nums, 'bigint')
}
