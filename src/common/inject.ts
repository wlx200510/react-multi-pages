import envConfig from '@/environments'

import { injectSDKScript } from '@/utils/helper'

import { ENV_TYPE } from '../environments/config.base'

/**
 * 注入eruda脚本，Console for Mobile Browsers
 */
;(function injectErudaSDK() {
  if (envConfig.type === ENV_TYPE.PROD) return

  const ERUDA_SDK_URL = '//cdn.jsdelivr.net/npm/eruda'

  injectSDKScript(ERUDA_SDK_URL).then(() => (window as any).eruda.init())
})()

/**
 * Do feature detection, to figure out which polyfills needs to be imported.
 **/
;(async function loadPolyfills() {
  if (typeof window.IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }
})()
