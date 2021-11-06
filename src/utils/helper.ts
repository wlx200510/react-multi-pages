/**
 * @description 异步加载script脚本
 * @param { string } src
 */
export function injectSDKScript(src: string) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true
    script.src = src

    script.addEventListener('load', function () {
      resolve('load')
    })

    script.addEventListener('error', function (err) {
      reject(err)
    })

    document.body.appendChild(script)
  })
}

/**
 * 校验Email字符串的格式，参考：https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input/email#basic_validation
 * @param email
 */
export function validateEmail(email: string) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
    email
  )
}

/**
 * 取出对象中指定属性的值。
 */
export const prop: <K extends keyof T, T>(key: K) => (obj: T) => T[K] =
  (key) => (obj) =>
    obj[key]

/**
 * 两数相加
 */
export const add = (a: number, b: number) => a + b
