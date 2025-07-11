import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('promises', () => {
  describe('default behaviour', () => {
    it('returns `Promise{…}` for a Promise', () => {
      expect(inspect(Promise.resolve())).to.equal('Promise{…}')
    })

    it('returns `Promise{…}` for a rejected Promise', () => {
      const prom = Promise.reject(new Error('Foo!'))
      expect(inspect(prom)).to.equal('Promise{…}')
      // catch the promise to prevent warnings
      prom.catch(() => {})
    })

    it('returns `Promise{…}` for a pending Promise', () => {
      let resolver
      try {
        const prom = new Promise(resolve => {
          resolver = resolve
        })
        expect(inspect(prom)).to.equal('Promise{…}')
      } finally {
        resolver()
      }
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
})
