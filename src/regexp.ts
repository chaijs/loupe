import { truncate } from './helpers.js'
import type { Options } from './types.js'

export default function inspectRegExp(value: RegExp, options: Options): string {
  const flags = value.toString().split('/')[2]
  const sourceLength = options.truncate - (2 + flags.length)
  const source = value.source
  return options.stylize(`/${truncate(source, sourceLength)}/${flags}`, 'regexp')
}
