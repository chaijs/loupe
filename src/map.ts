import { inspectChild, inspectList } from './helpers.js'
import type { Inspect, Options } from './types.js'

function inspectMapEntry([key, value]: [unknown, unknown], options: Options): string {
  options.truncate -= 4
  key = inspectChild(key, options)
  options.truncate -= (key as string).length
  value = inspectChild(value, options)
  return `${key} => ${value}`
}

// IE11 doesn't support `map.entries()`
function mapToEntries<K, V>(map: Map<K, V>): Array<[K, V]> {
  const entries: Array<[K, V]> = []
  map.forEach((value, key) => {
    entries.push([key, value])
  })
  return entries
}

export default function inspectMap(map: Map<unknown, unknown>, options: Options): string {
  if (options.depth < 0) return options.stylize('[Map]', 'special')
  if (map.size === 0) return 'Map{}'
  options.truncate -= 7
  return `Map{ ${inspectList(mapToEntries(map), options, inspectMapEntry as Inspect)} }`
}
