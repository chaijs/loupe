import { inspectList } from './helpers.ts'
import type { Options } from './types.ts'

export default function inspectArguments(args: IArguments, options: Options): string {
  if (args.length === 0) return 'Arguments[]'
  options.truncate -= 13
  return `Arguments[ ${inspectList(args, options)} ]`
}
