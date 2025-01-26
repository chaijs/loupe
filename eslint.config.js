import eslintjs from '@eslint/js'
import prettier from 'eslint-plugin-prettier/recommended'

const { configs: eslintConfigs } = eslintjs

export default [
  {
    ignores: ['lib/', 'loupe.js'],
  },
  eslintConfigs['recommended'],
  prettier,
  {
    languageOptions: {
      globals: {
        Buffer: false,
        process: false,
        document: false,
        window: false,
        global: false,
        HTMLElement: false,
      },
    },
    rules: {
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    files: ['test/*', 'bench/*'],
    languageOptions: {
      // if we ever use more globals than this, pull in the `globals` package
      globals: {
        Buffer: false,
        process: false,
        console: false,
        describe: false,
        beforeEach: false,
        it: false,
      },
    },
  },
]
