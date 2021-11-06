const lintStagedConfig = require('./.lintstagedrc.js')

const listStagedFixConfig = Object.keys(lintStagedConfig).reduce(
  (result, key) => {
    result[key] = lintStagedConfig[key].map((command) => `${command} --fix`)
    return result
  },
  {}
)

module.exports = listStagedFixConfig
