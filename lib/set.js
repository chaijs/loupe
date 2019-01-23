import { inspectList } from './helpers'

export default function inspectSet(set, options) {
  if (set.size === 0) return 'Set{}'
  options.truncate -= 7
  return `Set{ ${inspectList(Array.from(set), options)} }`
}
