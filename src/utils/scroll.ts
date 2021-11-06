/**
 * 滚到页面顶部
 */
export function scrollToTop() {
  try {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  } catch (error) {
    console.error('scrollToTop error', error)
  }
}

/**
 * 滚到目标位置
 */
export function scrollToTarget(elem: HTMLElement) {
  if (!elem) return

  const documentPaddingTop = elem.offsetTop
  try {
    window.scrollTo({
      top: documentPaddingTop,
      behavior: 'smooth',
    })
  } catch (error) {
    console.error('scrollTo error', error)
  }
}
