import inspectHTMLElement from './html'
import { inspectList } from './helpers'

export default function inspectHTMLCollection(collection, options) {
  return inspectList(collection, options, inspectHTMLElement, '\n')
}
