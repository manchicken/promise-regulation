// Test the limitedConcurrency function
const { limitedConcurrency } = require('../limited-concurrency')

// This function waits three seconds and then resolves with `true`
const waitThreeSeconds = () =>
  new Promise((resolve) => setTimeout(resolve, 3000, true))

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
    const results = await limitedConcurrency(promises, 1)
    expect(results).toHaveLength(5)
    expect(promises).toHaveLength(5)
  })
})
