const {
  protectPromise,
  PromiseProtectedRejected,
} = require('./protected-promise')

/**
 * This function will run your list of promises, and then it'll return an object containing a list of which promises resolved and which ones rejected.
 * @param {Array<Promise|Bluebird>} listOfPromises - This is an `Array` of `Promise`s suitable for `Promise.all()`.
 * @returns {Promise<Object>} - Returns a `Promise` which resolves to an `Object` with properties `resolved` and `rejected`, containing an `Array` of `Promise`s which resolved and rejected, respectively.
 * @exports
 * @public
 */
const coalescePromises = (listOfPromises) =>
  Promise.all(listOfPromises.map((x) => protectPromise(x))).then((all) =>
    all.reduce(
      (agg, cur) => {
        if (cur instanceof PromiseProtectedRejected) {
          agg.rejected.push(cur)
        } else {
          agg.resolved.push(cur)
        }

        return agg
      },
      { rejected: [], resolved: [] },
    ),
  )

module.exports = { coalescePromises }
