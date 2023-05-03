import inspect from '../src/index.ts'
import {expect} from 'chai'
describe('date', () => {
  it('returns date in iso format', () => {
    expect(inspect(new Date(1475318637123))).to.equal('2016-10-01T10:43:57.123Z')
  })

  it('returns "Invalid Date" if given an invalid Date object', () => {
    // See: https://github.com/chaijs/loupe/issues/58
    expect(inspect(new Date('not a date'))).to.equal('Invalid Date')
  })

  describe('colors', () => {
    it('returns date with red color, if colour is set to true', () => {
      expect(inspect(new Date(1475318637123), { colors: true })).to.equal(
        '\u001b[35m2016-10-01T10:43:57.123Z\u001b[39m'
      )
    })
  })

  describe('truncate', () => {
    it('returns the full representation when truncate is over string length', () => {
      expect(inspect(new Date(1475318637123), { truncate: 24 })).to.equal('2016-10-01T10:43:57.123Z')
    })

    it('truncates strings longer than truncate (23)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 23 })).to.equal('2016-10-01T10:43:57.12…')
    })

    it('truncates strings longer than truncate (22)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 22 })).to.equal('2016-10-01T10:43:57.1…')
    })

    it('truncates strings longer than truncate (21)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 21 })).to.equal('2016-10-01T10:43:57.…')
    })

    it('truncates strings longer than truncate (20)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 20 })).to.equal('2016-10-01T10:43:57…')
    })

    it('truncates strings longer than truncate (19)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 19 })).to.equal('2016-10-01T10:43:5…')
    })

    it('truncates strings longer than truncate (18)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 18 })).to.equal('2016-10-01T10:43:…')
    })

    it('truncates strings longer than truncate (17)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 17 })).to.equal('2016-10-01T10:43…')
    })

    it('truncates strings longer than truncate (16)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 16 })).to.equal('2016-10-01T10:4…')
    })

    it('truncates strings longer than truncate (15)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 15 })).to.equal('2016-10-01T10:…')
    })

    it('truncates strings longer than truncate (14)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 14 })).to.equal('2016-10-01T10…')
    })

    it('truncates strings longer than truncate (13)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 13 })).to.equal('2016-10-01T1…')
    })

    it('truncates strings longer than truncate (12)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 12 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (11)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 11 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (10)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 10 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (9)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 9 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (8)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 8 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (7)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 7 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (6)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 6 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (5)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 5 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (4)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 4 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (3)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 3 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (2)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 2 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (1)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 1 })).to.equal('2016-10-01T…')
    })

    it('does not truncate past the date value with low truncate values (0)', () => {
      expect(inspect(new Date(1475318637123), { truncate: 0 })).to.equal('2016-10-01T…')
    })
  })
})
