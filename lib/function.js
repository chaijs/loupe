import { truncate } from './helpers.js'

export default function inspectFunction(func, options) {
  const name = func.name
  if (!name) {
    return options.stylize('[Function]', 'special')
  }
  return options.stylize(`[Function ${truncate(name, options.truncate - 11)}]`, 'special')
}
