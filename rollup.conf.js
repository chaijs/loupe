import coverage from 'rollup-plugin-istanbul'
import common from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import transform from 'rollup-plugin-babel'
const plugins = [
  common({ namedExports: { chai: ['expect'] } }),
  resolve(),
  transform({
    exclude: 'node_modules/**',
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            ie: '11',
          },
          useBuiltIns: 'entry',
          corejs: 3,
        },
      ],
    ],
  }),
]
export default [
  {
    input: 'index.js',
    output: {
      file: 'loupe.js',
      name: 'loupe',
      format: 'umd',
    },
    plugins,
  },
  {
    input: 'test/index.js',
    output: {
      file: 'loupe.test.js',
      name: 'loupe',
      format: 'umd',
    },
    plugins: [...plugins, coverage({ exclude: 'test/*.js' })],
  },
]
