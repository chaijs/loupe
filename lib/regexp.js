import { truncate } from './helpers'

export default function inspectRegExp(value, options) {
  const sourceLength = options.truncate - (2 + value.flags.length)
  const source = value.source
  return options.stylize(`/${truncate(source, sourceLength)}/${value.flags}`, 'regexp')
}
