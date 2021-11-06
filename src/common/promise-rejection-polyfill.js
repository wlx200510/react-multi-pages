const init = () => {
  let global = window,
    NativePromise = global.Promise,
    __PromiseIsHandled__ = Symbol('[[PromiseIsHandled]]'),
    __Rejected__ = Symbol('[[Rejected]]'),
    __PromiseResult__ = Symbol('[[PromiseResult]]')

  class PromiseRejectionEvent extends Event {
    constructor(type, parameters) {
      super(type, {
        cancelable: true,
      })
      Object.defineProperties(this, {
        promise: {
          value: parameters.promise,
          enumerable: true,
        },
        reason: {
          value: parameters.reason,
          enumerable: true,
        },
      })
    }
  }

  function dispatchPromiseEvent(type, promise, reason) {
    let event = new PromiseRejectionEvent(type, {
      promise: promise,
      reason: reason,
    })
    let propertyVersion = 'on' + type

    global.dispatchEvent(event)

    if (global[propertyVersion]) {
      // In a timeout to prevent errors from blocking code
      setTimeout(() => {
        if (typeof global[propertyVersion] == 'function') {
          global[propertyVersion](event)
        }
      })
    }
  }

  let blockRecursion = false

  class Promise extends NativePromise {
    constructor(callback) {
      super(callback)

      // The super.then() call below creates a new Promise, making
      // recursion-busting necessary:
      if (blockRecursion) {
        return this
      }
      blockRecursion = true

      this[__PromiseIsHandled__] = false
      this[__Rejected__] = false

      // This causes a recursive call to this constructor:
      super.then(null, (reason) => {
        if (!this[__PromiseIsHandled__]) {
          this[__PromiseResult__] = reason
          this[__Rejected__] = true
          dispatchPromiseEvent('unhandledrejection', this, reason)
        }
      })

      blockRecursion = false
      return this
    }

    then(onResolve, onReject) {
      if (this[__Rejected__] && !this[__PromiseIsHandled__]) {
        // The first time an already-rejected promise is handled
        dispatchPromiseEvent('rejectionhandled', this, this[__PromiseResult__])
      }
      this[__PromiseIsHandled__] = true
      return super.then(onResolve, onReject)
    }

    catch(onReject) {
      // Make sure it calls then (which it should)
      return this.then(null, onReject)
    }
  }

  global.Promise = Promise
  global.PromiseRejectionEvent = PromiseRejectionEvent
}

export default init
