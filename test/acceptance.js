import inspect from '../index'
import { expect } from 'chai'
describe('arrays', () => {
  it('an array of strings truncates the array when it can', () => {
    expect(inspect(['foo', 'bar', 'baz', 'bing'], { truncate: 22 })).to.equal("[ 'foo', 'bar', …(2) ]")
  })

  it('an array of strings truncates the strings when it can', () => {
    expect(inspect(['foobarbazbing'], { truncate: 15 })).to.equal("[ 'foobarba…' ]")
  })
})
