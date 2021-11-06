import { AppEnvironment, ENV_TYPE } from './config.base'

const config: AppEnvironment = {
  type: ENV_TYPE.STAGING,
  apiPrefix: window.location.origin,
}

export default config
