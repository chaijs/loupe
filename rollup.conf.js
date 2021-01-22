import coverage from 'rollup-plugin-istanbul'
import common from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import transform from 'rollup-plugin-babel'

const plugins = [
  common(),
  resolve(),
  transform({
    exclude: 'node_modules/**',
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            browsers: ['ie >= 11'],
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
      exports: 'named',
    },
    plugins,
  },
  {
    input: 'test/index.js',
    output: {
      file: 'loupe.test.js',
      name: 'loupe',
      format: 'umd',
      exports: 'named',
    },
    plugins: [...plugins, coverage({ exclude: 'test/*.js' })],
  },
]
