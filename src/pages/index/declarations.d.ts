/* eslint-disable no-unused-vars */
declare module '@loadable/component'
declare module 'intersection-observer'

interface Window {
  Paytm: {
    CheckoutJS: {
      init: (data: any) => Promise
      invoke: () => void
      onLoad: (data: any) => void
      close: () => void
    }
  }
}
