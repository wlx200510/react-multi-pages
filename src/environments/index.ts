import { ENV_TYPE } from './config.base'
import devConfig from './config.dev'
import prodConfig from './config.prod'
import stageConfig from './config.staging'
import testingConfig from './config.testing'

const envConfig = (function () {
  switch (process.env.REACT_APP_ENV) {
    case ENV_TYPE.DEV:
      return devConfig

    case ENV_TYPE.TESTING:
      return testingConfig

    case ENV_TYPE.STAGING:
      return stageConfig

    case ENV_TYPE.PROD:
      return prodConfig

    default:
      return prodConfig
  }
})()

export default envConfig
