const { coalescePromises } = require('./coalesce-promises')
const { protectPromise } = require('./protected-promise')

const SleepyTimeDelay = 250
const sleepyTime = (sleepDelay) =>
  new Promise((resolve) => setTimeout(resolve, sleepDelay, true))

/**
 * A function which allows for concurrent running of promises, but limits the number of concurrent promises.
 * @param {Array<Function>} promiseFunctions - An array of functions to run, all of which return a promise.
 * @param {Number} limit - The number of promises to run concurrently.
 * @param {Number} sleepDelay - The number of milliseconds to wait between limit checks.
 * @returns {Promise} - A promise which resolves when all promises have resolved.
 */
const limitedConcurrency = async (
  promises = [],
  limit = 1,
  sleepDelay = SleepyTimeDelay,
) => {
  let currentlyRunning = 0
  const leftToRun = [...promises]
  const finished = []

  while (leftToRun.length > 0) {
    if (currentlyRunning < limit) {
      currentlyRunning += 1
      finished.push(
        protectPromise(leftToRun.shift()()).then((result) => {
          currentlyRunning -= 1
          return Promise.resolve(result)
        }),
      )
    } else {
      await sleepyTime(sleepDelay)
    }
  }

  return Promise.all(finished)
}

module.exports = {
  limitedConcurrency,
}
