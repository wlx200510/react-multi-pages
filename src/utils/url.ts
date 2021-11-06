import Qs from 'qs'

/**
 * @description 解析一个url
 * @param { string } url
 * @returns
 */
export function parseUrl(url = window.location.href) {
  const RE = /^(?:([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/

  const [total, base, query, hash] = RE.exec(url) || []

  return { total, base, query, hash }
}

/**
 * @description 解析url的query参数
 * @param { string } url
 * @returns
 */
export function getUrlParams(url = window.location.href) {
  return Qs.parse(parseUrl(url).query)
}

/**
 * @description 向url追加query参数，重名则覆盖
 * @param { string } url
 * @param { object } extraParams
 */
export function appendUrlParams(url = window.location.href, extraParams = {}) {
  const [path, search] = url.split('?')

  const queryObj = {
    ...Qs.parse(search),
    ...extraParams,
  }

  return `${path}?${Qs.stringify(queryObj, { arrayFormat: 'repeat' })}`
}
