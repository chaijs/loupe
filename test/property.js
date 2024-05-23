import inspect from '../lib/index.js'
import { expect } from 'chai'
import fc from 'fast-check'

describe('property', () => {
  it('produces valid UTF-16 strings whatever the source', () => {
    fc.assert(
      fc.property(
        fc.anything({
          withBigInt: true,
          withBoxedValues: true,
          withDate: true,
          withMap: true,
          withNullPrototype: true,
          withObjectString: true,
          withSet: true,
          withSparseArray: true,
          withTypedArray: true,
          withUnicodeString: true,
        }),
        fc.option(fc.nat(), { nil: undefined }),
        (source, truncate) => {
          expect(() => encodeURI(inspect(source, { truncate }))).not.to.throw()
        }
      )
    )
  })
})
