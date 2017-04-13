import inspect from '../index'
import { expect } from 'chai'
describe('errors', () => {
  it('returns `Error` for an empty Error', () => {
    expect(inspect(new Error())).to.equal('Error')
  })

  it('also works with Error subclasses (TypeError)', () => {
    expect(inspect(new TypeError())).to.equal('TypeError')
  })

  it('also works with Error subclasses (SyntaxError)', () => {
    expect(inspect(new SyntaxError())).to.equal('SyntaxError')
  })

  it('also works with Error subclasses (ReferenceError)', () => {
    expect(inspect(new ReferenceError())).to.equal('ReferenceError')
  })

  it('returns `Error{"message"}` for an Error("message")', () => {
    expect(inspect(new Error('message'))).to.equal('Error: message')
  })

  describe('non-standard properties', () => {
    it('adds non standard properties to end of output', () => {
      const err = new Error('message')
      err.code = 404
      expect(inspect(err)).to.equal('Error: message { code: 404 }')
    })
  })
})
