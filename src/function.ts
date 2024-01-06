import { truncate } from './helpers.js'
import type { Options } from './types.js'

type ToStringable = Function & {[Symbol.toStringTag]: string};

export default function inspectFunction(func: ToStringable, options: Options) {
  const functionType = func[Symbol.toStringTag] || 'Function'

  const name = func.name
  if (!name) {
    return options.stylize(`[${functionType}]`, 'special')
  }
  return options.stylize(`[${functionType} ${truncate(name, options.truncate - 11)}]`, 'special')
}
