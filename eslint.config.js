import eslintjs from '@eslint/js'

const { configs: eslintConfigs } = eslintjs

export default [
  eslintConfigs['recommended'],
  {
    languageOptions: {
      globals: {
        Buffer: false,
        process: false,
        document: false,
        window: false,
        global: false,
      }
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
      }
    },
  },
]
