/**
 * 环境类型 对应环境变量REACT_APP_ENV
 */
export enum ENV_TYPE {
  /**
   * 本地开发环境(暂不使用，与测试环境对齐)
   */
  DEV = 'dev',

  /**
   * 测试环境
   */
  TESTING = 'testing',

  /**
   * 预上线环境
   */
  STAGING = 'staging',

  /**
   * 生产环境
   */
  PROD = 'prod',
}

/**
 * APP 环境配置
 */
export interface AppEnvironment {
  /**
   * 当前环境类型
   */
  type: ENV_TYPE

  /**
   * API前缀
   */
  apiPrefix?: string
}
