import inspect from '../index'
import { expect } from 'chai'
// eslint-disable-next-line id-length
const h = (name, attributes, ...children) => {
  const container = document.createElement(name)
  for (const key in attributes) {
    container.setAttribute(key, attributes[key])
  }
  for (const i in children) {
    container.appendChild(children[i])
  }
  return container
}
describe('HTMLElement', () => {
  beforeEach(() => {
    if (typeof HTMLElement !== 'function') {
      class HTMLElement {
        constructor(tagName) {
          this.tagName = tagName.toUpperCase()
          this.attributes = {}
          this.children = []
        }

        appendChild(element) {
          this.children.push(element)
        }

        getAttribute(name) {
          return this.attributes[name]
        }

        setAttribute(name, value) {
          this.attributes[name] = value
        }

        getAttributeNames() {
          return Object.keys(this.attributes)
        }
      }
      global.document = {}
      global.document.createElement = tagName => new HTMLElement(tagName)
      global.HTMLElement = HTMLElement
    }
  })

  it('returns `<div></div>` for an empty div', () => {
    expect(inspect(h('div'))).to.equal('<div></div>')
  })

  it('returns `<div id="foo"></div>` for a div with an id', () => {
    expect(inspect(h('div', { id: 'foo' }))).to.equal('<div id="foo"></div>')
  })

  it('returns `<div id="foo" aria-live="foo" hidden></div>` for a div with an id', () => {
    expect(inspect(h('div', { id: 'foo', 'aria-live': 'bar', hidden: '' }))).to.equal(
      '<div id="foo" aria-live="bar" hidden></div>'
    )
  })

  it('returns output including children', () => {
    expect(
      inspect(h('div', { id: 'foo', hidden: '' }, h('pre', {}, h('code', {}, h('span', { style: 'color:red' })))))
    ).to.equal('<div id="foo" hidden><pre><code><span style="color:red"></span></code></pre></div>')
  })

  describe('truncate', () => {
    let template = null
    beforeEach(() => {
      template = h('div', { id: 'foo', hidden: '' }, h('pre', {}, h('code', {}, h('span', { style: 'color:red' }))))
    })

    it('returns the full representation when truncate is over string length', () => {
      expect(inspect(template, { truncate: 100 })).to.equal(
        '<div id="foo" hidden><pre><code><span style="color:red"></span></code></pre></div>'
      )
    })

    it('truncates arguments values longer than truncate (81)', () => {
      expect(inspect(template, { truncate: 81 })).to.equal(
        '<div id="foo" hidden><pre><code><span …(1)></span></code></pre></div>'
      )
    })

    it('truncates arguments values longer than truncate (78)', () => {
      expect(inspect(template, { truncate: 78 })).to.equal(
        '<div id="foo" hidden><pre><code><span …(1)></span></code></pre></div>'
      )
    })

    it('truncates arguments values longer than truncate (77)', () => {
      expect(inspect(template, { truncate: 77 })).to.equal('<div id="foo" hidden><pre><code>…(1)</code></pre></div>')
    })

    it('truncates arguments values longer than truncate (64)', () => {
      expect(inspect(template, { truncate: 64 })).to.equal('<div id="foo" hidden><pre><code>…(1)</code></pre></div>')
    })

    it('truncates arguments values longer than truncate (63)', () => {
      expect(inspect(template, { truncate: 63 })).to.equal('<div id="foo" hidden><pre>…(1)</pre></div>')
    })

    it('truncates arguments values longer than truncate (51)', () => {
      expect(inspect(template, { truncate: 51 })).to.equal('<div id="foo" hidden><pre>…(1)</pre></div>')
    })

    it('truncates arguments values longer than truncate (49)', () => {
      expect(inspect(template, { truncate: 49 })).to.equal('<div id="foo" hidden>…(1)</div>')
    })

    it('truncates arguments values longer than truncate (26)', () => {
      expect(inspect(template, { truncate: 26 })).to.equal('<div id="foo" hidden>…(1)</div>')
    })

    it('truncates arguments values longer than truncate (25)', () => {
      expect(inspect(template, { truncate: 25 })).to.equal('<div id="foo" …(1)>…(1)</div>')
    })

    it('truncates arguments values longer than truncate (24)', () => {
      expect(inspect(template, { truncate: 24 })).to.equal('<div id="foo" …(1)>…(1)</div>')
    })

    it('truncates arguments values longer than truncate (23)', () => {
      expect(inspect(template, { truncate: 23 })).to.equal('<div …(2)>…(1)</div>')
    })

    it('disregards truncate when it cannot truncate further (18)', () => {
      expect(inspect(template, { truncate: 18 })).to.equal('<div …(2)>…(1)</div>')
    })

    it('disregards truncate when it cannot truncate further (1)', () => {
      expect(inspect(template, { truncate: 1 })).to.equal('<div …(2)>…(1)</div>')
    })
  })

  describe('colors', () => {
    it('returns element as cyan, with attribute names in yellow and values as string colour', () => {
      expect(inspect(h('div', { id: 'foo' }), { colors: true })).to.equal(
        '\u001b[36m<div\u001b[39m \u001b[33mid\u001b[39m=\u001b[32m' +
          '"foo"\u001b[39m\u001b[36m>\u001b[39m\u001b[36m</div>\u001b[39m'
      )
    })
  })
})
