const packageJson = require('./package.json')
/* eslint-disable no-process-env */
let job = process.env.JOB_NUMBER || Date.now()
let browsers = ['ChromeHeadless']
let build = 'localbuild'
let branch = 'local'
let startConnect = false
const reporters = ['progress', 'coverage']
const tags = [`${packageJson.name}@${packageJson.version}`]
const frameworks = ['mocha']
const debug = Boolean(process.env.npm_config_debug)

if (process.env.SAUCE_USERNAME) {
  browsers = ['SauceEdgeLatest', 'SauceInternetExplorerTen', 'SauceSafariLatest']
  tags.push(`${process.env.SAUCE_USERNAME}@${branch}`)
  reporters.push('saucelabs')
  startConnect = true
} else if (process.env.APPVEYOR) {
  browsers = ['Firefox', 'ChromeHeadless', 'IE']
} else if (process.env.TRAVIS) {
  browsers = ['FirefoxHeadless', 'ChromeHeadless']
}

if (process.env.APPVEYOR) {
  branch = process.env.APPVEYOR_REPO_BRANCH
  build = `appveyor@${process.env.APPVEYOR_JOB_NUMBER}`
  job = process.env.APPVEYOR_JOB_NUMBER
} else if (process.env.TRAVIS) {
  branch = process.env.TRAVIS_BRANCH
  build = `travis@${process.env.TRAVIS_JOB_NUMBER}`
  job = process.env.TRAVIS_JOB_NUMBER
  // Travis has its own saucelabs connect process, so ensure karma won't run it
  startConnect = false
}
/* eslint-enable */

tags.push(build)
module.exports = function configureKarma(config) {
  config.set({
    basePath: '',
    browsers,
    singleRun: true,
    logLevel: debug ? config.LOG_DEBUG : config.LOG_INFO,
    frameworks,
    files: [`${packageJson.name}.test.js`],
    reporters,
    coverageReporter: {
      type: 'lcov',
      dir: 'coverage',
    },
    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless'],
      },
      SauceSafariLatest: {
        base: 'SauceLabs',
        browserName: 'Safari',
        platform: 'OS X 10.11',
      },
      SauceInternetExplorerTen: {
        base: 'SauceLabs',
        browserName: 'Internet Explorer',
        version: 10,
      },
      SauceEdgeLatest: {
        base: 'SauceLabs',
        browserName: 'MicrosoftEdge',
      },
    },
    sauceLabs: {
      testName: packageJson.name,
      tunnelIdentifier: job,
      startConnect,
      tags,
    },
  })
}
