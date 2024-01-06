import { truncate } from './helpers.js'
import type { Options } from './types.js'

export default function inspectFunction(func: Function, options: Options) {
  let functionType = 'Function'
  // @ts-ignore
  const stringTag = func[Symbol.toStringTag];
  if (typeof stringTag === 'string') {
    functionType = stringTag;
  }

  const name = func.name
  if (!name) {
    return options.stylize(`[${functionType}]`, 'special')
  }
  return options.stylize(`[${functionType} ${truncate(name, options.truncate - 11)}]`, 'special')
}
