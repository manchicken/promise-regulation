// Test the limitedConcurrency function
const { limitedConcurrency } = require('../limited-concurrency')

// This function waits three seconds and then resolves with `true`
const waitThreeSeconds = () =>
  new Promise((resolve) => setTimeout(resolve, 3000, true))

// Let's have things take 30 seconds for the timeout.
jest.setTimeout(30000)

describe('limitedConcurrency', () => {
  test('One promise at a time', async () => {
    const promises = [
      waitThreeSeconds,
      waitThreeSeconds,
      waitThreeSeconds,
      waitThreeSeconds,
      waitThreeSeconds,
    ]
    const results = await limitedConcurrency(promises, 3)
    expect(results).toHaveLength(5)
    expect(promises).toHaveLength(5)
  })

  test('Verify that limitedConcurrency() actually limits concurrency', async () => {
    let totalRunCount = 0

    // This function gives us a closure which returns a promise that increments the counter.
    const trackablePromise = () => () =>
      Promise.resolve()
        .then(() => (totalRunCount += 1))
        .then(waitThreeSeconds)

    // Make a list of five promises
    const promises = [
      trackablePromise(),
      trackablePromise(),
      trackablePromise(),
      trackablePromise(),
      trackablePromise(),
    ]

    // Run those promises with a concurrency limit of 3
    const results = limitedConcurrency(promises, 3)

    // Wait a brief period of time to let the promises get started
    await new Promise((resolve) => setTimeout(resolve, 50))

    // We've been less than 3 seconds since we started the promises, so we should have exactly 3 promises running, and the `totalRunCount` should now equal 3.
    expect(totalRunCount).toBe(3)

    // Wrap up the rest of the promises
    await results

    // Make sure that all of the promises did eventually run.
    expect(totalRunCount).toBe(5)
  })
})
