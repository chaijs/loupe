import loupe from '../index'
import { inspect as nodeInspect } from 'util'
import Benchmark from 'benchmark'
const benches = []
const mapObjRefA = {}
const mapObjRefB = {}
function getArguments() {
  return arguments // eslint-disable-line prefer-rest-params
}
class A {}
const fixtures = {
  'string literal     ': 'abc',
  'array literal      ': [1, 2, 3],
  'boolean literal    ': true,
  'object literal     ': { a: 1 },
  'object from null   ': Object.create(null),
  'regex literal      ': /^abc$/,
  'number literal     ': 1,
  'null               ': null,
  'undefined          ': undefined,
  'buffer             ': Buffer.from('hello world'),
  'date               ': new Date(123),
  'map                ': new Map().set('a', 1),
  'map (complex)      ': new Map().set(mapObjRefA, new Map().set(mapObjRefB, 1)),
  'regex constructor  ': new RegExp('abc'),
  'set                ': new Set().add(1),
  'string constructor ': new String(),
  'arguments          ': getArguments(1, 2, 3),
  'class              ': new A(),
}

function prepareBenchMark(test, name, inspect) {
  benches.push(
    new Benchmark(name, {
      fn() {
        inspect(test)
      },
      onCycle(event) {
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(event.target.toString())
      },
    })
  )
}

const filter = process.argv.slice(2).filter(arg => arg[0] !== '-')[0] || ''
const nodeinspect = process.argv.indexOf('--nodeinspect') !== -1
Object.keys(fixtures)
  .filter(key => key.indexOf(filter) !== -1)
  .forEach(testName => {
    prepareBenchMark(fixtures[testName], `${testName} (loupe)`, loupe)
    if (nodeinspect) {
      prepareBenchMark(fixtures[testName], `${testName}  (node)`, nodeInspect)
    }
  })
Benchmark.invoke(benches, {
  name: 'run',
  onCycle() {
    console.log('')
  },
  onComplete() {
    console.log('~Fin~')
  },
})
