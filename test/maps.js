import inspect from '../lib/index.js'
import { expect } from 'chai'
describe('maps', () => {
  it('returns `Map{}` for empty Maps', () => {
    expect(inspect(new Map())).to.equal('Map{}')
  })

  it('inspects both keys and values', () => {
    expect(
      inspect(
        new Map([
          [{ a: 1 }, { b: 1 }],
          [{ a: 2 }, { b: 2 }],
        ])
      )
    ).to.equal('Map{ { a: 1 } => { b: 1 }, { a: 2 } => { b: 2 } }')
  })

  describe('truncate', () => {
    it('returns the full representation when truncate is over string length', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 35 }
        )
      ).to.equal("Map{ 'a' => 1, 'b' => 2, 'c' => 3 }")
    })

    it('truncates map values longer than truncate (34)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 34 }
        )
      ).to.equal("Map{ 'a' => 1, 'b' => 2, …(1) }")
    })

    it('truncates map values longer than truncate (33)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 33 }
        )
      ).to.equal("Map{ 'a' => 1, 'b' => 2, …(1) }")
    })

    it('truncates map values longer than truncate (32)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 32 }
        )
      ).to.equal("Map{ 'a' => 1, 'b' => 2, …(1) }")
    })

    it('truncates map values longer than truncate (31)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 31 }
        )
      ).to.equal("Map{ 'a' => 1, 'b' => 2, …(1) }")
    })

    it('truncates map values longer than truncate (30)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 30 }
        )
      ).to.equal("Map{ 'a' => 1, …(2) }")
    })

    it('truncates map values longer than truncate (29)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 29 }
        )
      ).to.equal("Map{ 'a' => 1, …(2) }")
    })

    it('truncates map values longer than truncate (28)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 28 }
        )
      ).to.equal("Map{ 'a' => 1, …(2) }")
    })

    it('truncates map values longer than truncate (27)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 27 }
        )
      ).to.equal("Map{ 'a' => 1, …(2) }")
    })

    it('truncates map values longer than truncate (26)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 26 }
        )
      ).to.equal("Map{ 'a' => 1, …(2) }")
    })

    it('truncates map values longer than truncate (25)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 25 }
        )
      ).to.equal("Map{ 'a' => 1, …(2) }")
    })

    it('truncates map values longer than truncate (24)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 24 }
        )
      ).to.equal("Map{ 'a' => 1, …(2) }")
    })

    it('truncates map values longer than truncate (23)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 23 }
        )
      ).to.equal("Map{ 'a' => 1, …(2) }")
    })

    it('truncates map values longer than truncate (22)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 22 }
        )
      ).to.equal("Map{ 'a' => 1, …(2) }")
    })

    it('truncates map values longer than truncate (21)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 21 }
        )
      ).to.equal("Map{ 'a' => 1, …(2) }")
    })

    it('truncates map values longer than truncate (20)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 20 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (19)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 19 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (18)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 18 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (17)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 17 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (16)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 16 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (15)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 15 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (14)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 14 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (13)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 13 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (11)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 11 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (11)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 11 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (10)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 10 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (9)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 9 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (8)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 8 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (7)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 7 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (6)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 6 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (5)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 5 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (4)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 4 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (3)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 3 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (2)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 2 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (1)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 1 }
        )
      ).to.equal('Map{ …(3) }')
    })

    it('truncates map values longer than truncate (0)', () => {
      expect(
        inspect(
          new Map([
            ['a', 1],
            ['b', 2],
            ['c', 3],
          ]),
          { truncate: 0 }
        )
      ).to.equal('Map{ …(3) }')
    })
  })
})
