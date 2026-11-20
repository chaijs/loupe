import { inspectList } from './helpers.js'
import type { Options } from './types.js'

export default function inspectArguments(args: IArguments, options: Options): string {
  if (options.depth < 0) return options.stylize('[Arguments]', 'special')
  if (args.length === 0) return 'Arguments[]'
  options.truncate -= 13
  return `Arguments[ ${inspectList(args, options)} ]`
}
