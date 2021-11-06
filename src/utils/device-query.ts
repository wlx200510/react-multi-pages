/**
 * @description 设备匹配查询
 */
export class DeviceQuery {
  userAgent = ''

  constructor(userAgent: string) {
    this.userAgent = userAgent
  }

  get isIOS() {
    return /iP(hone|od|ad)/.test(this.userAgent)
  }

  get isAndroid() {
    return /Android|Adr/.test(this.userAgent)
  }

  /**
   * 抖音环境
   */
  get isDouYin() {
    return /aweme/.test(this.userAgent)
  }


  get isMobile() {
    return /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i.test(
      this.userAgent
    )
  }

  get isPC() {
    return !this.isMobile
  }

  get isIpad() {
    return /iPad/.test(this.userAgent)
  }

  get isIpadMini() {
    return /iPad/.test(this.userAgent) && window?.screen?.width === 768
  }

  get isQQ() {
    return /QQ/i.test(this.userAgent)
  }

  get isWechat() {
    return /micromessenger/i.test(this.userAgent)
  }

  get isWxMiniProgram() {
    return (
      this.userAgent.match(/miniprogram/i) ||
      // eslint-disable-next-line camelcase
      (<any>window).__wxjs_environment === 'miniprogram'
    )
  }

  get phoneDescriptor() {
    // eslint-disable-next-line prettier/prettier
    if (this.isIOS) return 'iOS'
    if (this.isAndroid) return 'Android'
    if (!this.isMobile) return 'PC'
    return 'other'
  }
}

export default new DeviceQuery(window.navigator.userAgent)
