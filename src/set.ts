import { inspectList } from './helpers.js'
import type { Options } from './types.js'

// IE11 doesn't support `Array.from(set)`
function arrayFromSet(set: Set<unknown>) {
  const values: unknown[] = []
  set.forEach(value => {
    values.push(value)
  })
  return values
}

export default function inspectSet(set: Set<unknown>, options: Options): string {
  if (options.depth < 0) return options.stylize('[Set]', 'special')
  if (set.size === 0) return 'Set{}'
  options.truncate -= 7
  return `Set{ ${inspectList(arrayFromSet(set), options)} }`
}
