import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('strings', () => {
  it('returns string wrapped in quotes', () => {
    expect(inspect('abc')).to.equal("'abc'")
  })

  it('escapes single quotes', () => {
    expect(inspect("ab'c")).to.equal("'ab\\'c'")
  })

  it('escapes backslashes', () => {
    expect(inspect('a\\b')).to.equal("'a\\\\b'")
  })

  it('distinguishes a real newline from an escaped backslash-n', () => {
    expect(inspect('\n')).to.equal("'\\n'")
    expect(inspect('\\n')).to.equal("'\\\\n'")
    expect(inspect('\n')).to.not.equal(inspect('\\n'))
  })

  it('does not escape double quotes', () => {
    expect(inspect('ab"c')).to.equal("'ab\"c'")
  })

  it('escapes unicode characters', () => {
    expect(inspect('\u001b')).to.equal("'\\u001b'")
  })

  it('escapes a leading variation selector', () => {
    expect(inspect('\ufe0f✅')).to.equal("'\\ufe0f✅'")
  })

  it('does not escape printable Unicode characters', () => {
    expect(inspect('✅')).to.equal("'✅'")
  })

  describe('leading variation selectors', () => {
    for (const [name, selector, escaped] of [
      ['U+180B', '\u180b', '\\u180b'],
      ['U+180D', '\u180d', '\\u180d'],
      ['U+180F', '\u180f', '\\u180f'],
      ['U+FE00', '\ufe00', '\\ufe00'],
      ['U+FE0F', '\ufe0f', '\\ufe0f'],
      ['U+E0100', '\u{e0100}', '\\udb40\\udd00'],
      ['U+E01EF', '\u{e01ef}', '\\udb40\\uddef'],
    ]) {
      it(`escapes ${name} at the start`, () => {
        expect(inspect(`${selector}x`)).to.equal(`'${escaped}x'`)
      })
    }

    for (const [name, character] of [
      ['U+180A', '\u180a'],
      ['U+180E', '\u180e'],
      ['U+1810', '\u1810'],
      ['U+FDFF', '\ufdff'],
      ['U+FE10', '\ufe10'],
      ['U+E00FF', '\u{e00ff}'],
      ['U+E01F0', '\u{e01f0}'],
    ]) {
      it(`stops at adjacent non-selector ${name}`, () => {
        expect(inspect(`${character}\ufe0f`)).to.equal(`'${character}\ufe0f'`)
      })
    }

    it('escapes a string containing only selectors', () => {
      expect(inspect('\ufe00\u{e0100}')).to.equal("'\\ufe00\\udb40\\udd00'")
    })

    it('escapes mixed and repeated leading selectors', () => {
      expect(inspect('\u180b\ufe0f\u{e0100}\u180f\ufe0fx')).to.equal("'\\u180b\\ufe0f\\udb40\\udd00\\u180f\\ufe0fx'")
    })

    it('preserves selectors following a base character', () => {
      expect(inspect('\u2764\ufe0f')).to.equal("'\u2764\ufe0f'")
      expect(inspect('\u1820\u180b')).to.equal("'\u1820\u180b'")
      expect(inspect('\u4e00\u{e0100}')).to.equal("'\u4e00\u{e0100}'")
    })

    it('stops at the first space', () => {
      expect(inspect(' \ufe0f')).to.equal("' \ufe0f'")
      expect(inspect('\ufe0f \ufe0f')).to.equal("'\\ufe0f \ufe0f'")
    })

    it('stops at the first combining mark', () => {
      expect(inspect('\u0301\ufe0f')).to.equal("'\u0301\ufe0f'")
      expect(inspect('\ufe0f\u0301\ufe0f')).to.equal("'\\ufe0f\u0301\ufe0f'")
    })

    it('stops at U+180E between selectors', () => {
      expect(inspect('\ufe0f\u180e\ufe0f')).to.equal("'\\ufe0f\u180e\ufe0f'")
    })

    it('distinguishes a selector from a literal Unicode escape', () => {
      expect(inspect('\\ufe0f')).to.equal("'\\\\ufe0f'")
      expect(inspect('\ufe0f\\ufe0f')).to.equal("'\\ufe0f\\\\ufe0f'")
    })

    it('preserves existing suffix escaping', () => {
      expect(inspect('\ufe0f\n')).to.equal("'\\ufe0f\\n'")
      expect(inspect("\ufe0f'\\")).to.equal("'\\ufe0f\\'\\\\'")
    })

    it('preserves ordinary combining marks and existing ZWJ escaping', () => {
      expect(inspect('e\u0301')).to.equal("'e\u0301'")
      expect(inspect('👩\u200d💻')).to.equal("'👩\\u200d💻'")
    })

    it('does not treat unpaired surrogates as selectors', () => {
      expect(inspect('\udb40\ufe0f')).to.equal("'\udb40\ufe0f'")
      expect(inspect('\udd00\ufe0f')).to.equal("'\udd00\ufe0f'")
    })
  })

  describe('colors', () => {
    it('colors the escaped prefix with the rest of the string', () => {
      expect(inspect('\ufe0f✅', { colors: true })).to.equal("\u001b[32m'\\ufe0f✅'\u001b[39m")
    })

    it('passes the escaped representation to a custom stylizer', () => {
      expect(inspect('\ufe0f✅', { stylize: (value, type) => `${type}:${value}` })).to.equal("string:'\\ufe0f✅'")
    })

    it('returns string with green color, if colour is set to true', () => {
      expect(inspect('abc', { colors: true })).to.equal("\u001b[32m'abc'\u001b[39m")
    })
  })

  describe('truncate', () => {
    it('applies truncation after escaping a leading selector', () => {
      expect(inspect('\ufe0f✅a', { truncate: 10 })).to.equal("'\\ufe0f✅a'")
      expect(inspect('\ufe0f✅a', { truncate: 9 })).to.equal("'\\ufe0f…'")
    })

    it('counts both escaped code units of a supplementary selector when truncating', () => {
      expect(inspect('\u{e0100}ab', { truncate: 15 })).to.equal("'\\udb40\\udd00…'")
    })

    it('returns the full string representation when truncate is over string length', () => {
      expect(inspect('foobarbaz', { truncate: 11 })).to.equal("'foobarbaz'")
    })

    it('truncates strings longer than truncate (10)', () => {
      expect(inspect('foobarbaz', { truncate: 10 })).to.equal("'foobarb…'")
    })

    it('truncates strings longer than truncate (9)', () => {
      expect(inspect('foobarbaz', { truncate: 9 })).to.equal("'foobar…'")
    })
    it('truncates strings longer than truncate (8)', () => {
      expect(inspect('foobarbaz', { truncate: 8 })).to.equal("'fooba…'")
    })

    it('truncates strings longer than truncate (7)', () => {
      expect(inspect('foobarbaz', { truncate: 7 })).to.equal("'foob…'")
    })

    it('truncates strings longer than truncate (6)', () => {
      expect(inspect('foobarbaz', { truncate: 6 })).to.equal("'foo…'")
    })

    it('truncates strings longer than truncate (5)', () => {
      expect(inspect('foobarbaz', { truncate: 5 })).to.equal("'fo…'")
    })

    it('truncates strings longer than truncate (4)', () => {
      expect(inspect('foobarbaz', { truncate: 4 })).to.equal("'f…'")
    })

    it('truncates strings longer than truncate (3)', () => {
      expect(inspect('foobarbaz', { truncate: 3 })).to.equal("'…'")
    })

    it('truncates strings involving surrogate pairs longer than truncate (7)', () => {
      // not '🐱🐱\ud83d…' (length 7) but '🐱🐱…' (length 6)
      expect(inspect('🐱🐱🐱', { truncate: 7 })).to.equal("'🐱🐱…'")
    })

    it('truncates strings involving surrogate pairs longer than truncate (6)', () => {
      expect(inspect('🐱🐱🐱', { truncate: 6 })).to.equal("'🐱…'")
    })

    it('truncates strings involving surrogate pairs longer than truncate (5)', () => {
      // not '🐱\ud83d…' (length 5) but '🐱…' (length 4)
      expect(inspect('🐱🐱🐱', { truncate: 5 })).to.equal("'🐱…'")
    })

    it('truncates strings involving graphemes than truncate (5)', () => {
      // partial support: valid string for unicode
      expect(inspect('👨‍👩‍👧‍👧', { truncate: 5 })).to.equal("'👨…'")
    })

    it('disregards truncate when it cannot truncate further (2)', () => {
      expect(inspect('foobarbaz', { truncate: 2 })).to.equal("'…'")
    })

    it('disregards truncate when it cannot truncate further (1)', () => {
      expect(inspect('foobarbaz', { truncate: 1 })).to.equal("'…'")
    })

    it('disregards truncate when it cannot truncate further (0)', () => {
      expect(inspect('foobarbaz', { truncate: 0 })).to.equal("'…'")
    })
  })
})
