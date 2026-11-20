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

  it('does not escape printable Unicode characters', () => {
    expect(inspect('\u2705')).to.equal("'\u2705'")
    expect(inspect('e\u0301')).to.equal("'e\u0301'")
  })

  describe('default ignorable code points', () => {
    for (const [name, character, escaped] of [
      ['U+00AD soft hyphen', '\u00ad', '\\u00ad'],
      ['U+034F combining grapheme joiner', '\u034f', '\\u034f'],
      ['U+180B Mongolian FVS1', '\u180b', '\\u180b'],
      ['U+180E Mongolian vowel separator', '\u180e', '\\u180e'],
      ['U+180F Mongolian FVS4', '\u180f', '\\u180f'],
      ['U+200B zero width space', '\u200b', '\\u200b'],
      ['U+200D zero width joiner', '\u200d', '\\u200d'],
      ['U+3164 Hangul filler', '\u3164', '\\u3164'],
      ['U+FE00 VS1', '\ufe00', '\\ufe00'],
      ['U+FE0F VS16', '\ufe0f', '\\ufe0f'],
      ['U+E0001 language tag', '\u{e0001}', '\\udb40\\udc01'],
      ['U+E0100 VS17', '\u{e0100}', '\\udb40\\udd00'],
      ['U+E01EF VS256', '\u{e01ef}', '\\udb40\\uddef'],
    ]) {
      it(`escapes ${name}`, () => {
        expect(inspect(`a${character}b`)).to.equal(`'a${escaped}b'`)
      })
    }

    it('escapes leading selectors', () => {
      expect(inspect('\ufe0f\u2705')).to.equal("'\\ufe0f\u2705'")
      expect(inspect('\u180b\ufe0f\u{e0100}x')).to.equal("'\\u180b\\ufe0f\\udb40\\udd00x'")
    })

    it('escapes selectors following a base character', () => {
      expect(inspect('\u2764\ufe0f')).to.equal("'\u2764\\ufe0f'")
      expect(inspect('\u4e00\u{e0100}')).to.equal("'\u4e00\\udb40\\udd00'")
    })

    it('escapes joiners within emoji sequences', () => {
      expect(inspect('\u{1f469}\u200d\u{1f4bb}')).to.equal("'\u{1f469}\\u200d\u{1f4bb}'")
    })

    it('does not escape adjacent non-ignorable characters', () => {
      expect(inspect('\u180a\u1810\ufdff\ufe10')).to.equal("'\u180a\u1810\ufdff\ufe10'")
    })

    it('distinguishes a selector from a literal Unicode escape', () => {
      expect(inspect('\ufe0f\\ufe0f')).to.equal("'\\ufe0f\\\\ufe0f'")
    })

    it('leaves unpaired surrogates unchanged', () => {
      expect(inspect('\udb40\ufe0f')).to.equal("'\udb40\\ufe0f'")
    })

    it('counts both escaped code units of a supplementary code point when truncating', () => {
      expect(inspect('\u{e0100}ab', { truncate: 15 })).to.equal("'\\udb40\\udd00\u2026'")
    })
  })

  describe('colors', () => {
    it('returns string with green color, if colour is set to true', () => {
      expect(inspect('abc', { colors: true })).to.equal("\u001b[32m'abc'\u001b[39m")
    })
  })

  describe('truncate', () => {
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
