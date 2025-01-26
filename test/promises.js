import inspect from '../lib/index.js'
import { expect } from 'chai'
const isNode = typeof process === 'object' && process.version
const canInspectPromises = isNode && 'getPromiseDetails' in process.binding('util')
describe('promises', () => {
  describe('default behaviour', () => {
    beforeEach(function () {
      if (isNode && canInspectPromises) {
        this.skip()
      }
    })

    it('returns `Promise{…}` for a Promise', () => {
      expect(inspect(Promise.resolve())).to.equal('Promise{…}')
    })

    it('returns `Promise{…}` for a rejected Promise', () => {
      const prom = Promise.reject(new Error('Foo!'))
      expect(inspect(prom)).to.equal('Promise{…}')
      // catch the promise to prevent warnings
      prom.catch(() => {})
    })

    describe('truncate', () => {
      it('returns the full string representation regardless of truncate', () => {
        expect(inspect(Promise.resolve(), { truncate: 9 })).to.equal('Promise{…}')
        expect(inspect(Promise.resolve(), { truncate: 8 })).to.equal('Promise{…}')
        expect(inspect(Promise.resolve(), { truncate: 7 })).to.equal('Promise{…}')
        expect(inspect(Promise.resolve(), { truncate: 6 })).to.equal('Promise{…}')
        expect(inspect(Promise.resolve(), { truncate: 5 })).to.equal('Promise{…}')
        expect(inspect(Promise.resolve(), { truncate: 4 })).to.equal('Promise{…}')
        expect(inspect(Promise.resolve(), { truncate: 3 })).to.equal('Promise{…}')
        expect(inspect(Promise.resolve(), { truncate: 2 })).to.equal('Promise{…}')
        expect(inspect(Promise.resolve(), { truncate: 1 })).to.equal('Promise{…}')
      })
    })
  })

  describe('node <= 16', () => {
    beforeEach(function () {
      if (!isNode || !canInspectPromises) {
        this.skip()
      }
    })

    it('returns an inspected version of the Promise value if it has already resolved', () => {
      expect(inspect(Promise.resolve(4))).to.equal('Promise{4}')
    })

    it('returns a "pending" version of the Promise value if it is pending', () => {
      expect(inspect(new Promise(() => {}))).to.equal('Promise{<pending>}')
    })

    it('returns a "rejected" version of the Promise value if it is rejected', () => {
      const prom = Promise.reject(new Error('Foo'))
      expect(inspect(prom)).to.equal('Promise!{Error: Foo}')
      // catch the promise to prevent warnings
      return prom.catch(() => {})
    })
  })
})
