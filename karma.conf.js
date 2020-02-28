// Karma configuration

module.exports = function configureKarma(config) {
  config.set({
    basePath: '',
    browsers: [],
    singleRun: true,
    logLevel: config.LOG_INFO,
    frameworks: ['mocha'],
    files: ['loupe.test.js'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
    },
  })
}
