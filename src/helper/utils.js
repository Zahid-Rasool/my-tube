import FtToastEvents from '../components/ft-toast/ft-toast-events'

export function showToast(message, time = null, action = null) {
  FtToastEvents.dispatchEvent(
    new CustomEvent('toast-open', {
      detail: {
        message,
        time,
        action
      }
    })
  )
}

/**
 * Performs a deep copy of a javascript object
 * @param {Object} obj
 * @returns {Object}
 */
export function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj))
}
