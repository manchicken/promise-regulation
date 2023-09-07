const {
  protectPromise,
  PromiseProtectedRejected,
} = require('../protected-promise')

describe('ProtectedPromise', () => {
  test('protectPromise(simple promise, resolves)', async () => {
    const thePromise = protectPromise(Promise.resolve(123))
    expect(thePromise).toBeInstanceOf(Promise)

    expect(thePromise).resolves.toBe(123)
  })

  test('protectPromise(simple promise, rejects)', async () => {
    const thePromise = protectPromise(
      Promise.resolve().then(() => {
        throw Error('TEST')
      }),
    )

    expect(thePromise).resolves.toBeInstanceOf(PromiseProtectedRejected)
  })

  test('protectPromise(promise, rejects)', async () => {
    const thePromise = protectPromise(
      Promise.resolve().then(() => Promise.reject(Error('TEST'))),
    )
    expect(thePromise).toBeInstanceOf(Promise)
    expect(thePromise).not.toBeInstanceOf(Error)

    expect(thePromise).resolves.toBeInstanceOf(PromiseProtectedRejected)
  })
})
