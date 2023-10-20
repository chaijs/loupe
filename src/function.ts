import { truncate } from './helpers.js'
import type { Options } from './types.js'

export default function inspectFunction(func: Function, options: Options) {
  const name = func.name
  if (!name) {
    return options.stylize('[Function]', 'special')
  }
  return options.stylize(`[Function ${truncate(name, options.truncate - 11)}]`, 'special')
}
