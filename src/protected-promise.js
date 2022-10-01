/**
 * A wrapper around promise rejections.
 * @extends Error
 * @public
 * @exports
 */
class PromiseProtectedRejected extends Error {
  constructor(originalError) {
    super(originalError.message, { cause: originalError })
  }
}

/**
 * Protect a Promise type, regardless of which type of Promise it is.
 * @param {Promise|Bluebird} ward - This is the Promise to protect.
 * @param {Object} options - Options for protection.
 * @param {Boolean} options.verbose - Log verbose messages with regard to this Promise
 * @exports
 * @public
 */
const protectPromise = (ward, options) => protectNativePromise(ward)

/**
 * Protect a native Promise.
 * @param  {Promise} ward - This is the Promise to protect.
 * @exports
 * @private
 */
const protectNativePromise = (ward) =>
  Promise.resolve()
    .then(() => Promise.resolve(ward))
    .catch((err) => Promise.resolve(new PromiseProtectedRejected(err)))

module.exports = {
  PromiseProtectedRejected,
  protectPromise,
}
