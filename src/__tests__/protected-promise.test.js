const {
  protectPromise,
  PromiseProtectedRejected,
} = require('../protected-promise')

const BluebirdPromise = require('bluebird')

describe('ProtectedPromise', () => {
  test('protectPromise(simple promise, resolves)', async () => {
    const thePromise = Promise.resolve(123)
    expect(thePromise).not.toBeInstanceOf(BluebirdPromise)
    expect(thePromise).toBeInstanceOf(Promise)

    const theProtectedPromise = protectPromise(thePromise)

    expect(theProtectedPromise).resolves.toBe(123)
  })

  test('protectPromise(simple promise, rejects)', async () => {
    const thePromise = Promise.resolve().then(() => {
      throw Error('TEST')
    })
    const theProtectedPromise = protectPromise(thePromise)

    expect(theProtectedPromise).resolves.toBeInstanceOf(
      PromiseProtectedRejected,
    )
  })

  test('protectPromise(bluebird promise, resolves)', async () => {
    const thePromise = BluebirdPromise.resolve(123)
    expect(thePromise).toBeInstanceOf(BluebirdPromise)
    expect(thePromise).not.toBeInstanceOf(Promise)

    const theProtectedPromise = protectPromise(thePromise)

    expect(theProtectedPromise).resolves.toBe(123)
  })

  test('protectPromise(bluebird promise, rejects)', async () => {
    const thePromise = BluebirdPromise.resolve().then(() => {
      throw Error('TEST')
    })
    expect(thePromise).toBeInstanceOf(BluebirdPromise)
    expect(thePromise).not.toBeInstanceOf(Promise)

    const theProtectedPromise = protectPromise(thePromise)

    expect(theProtectedPromise).resolves.toBeInstanceOf(
      PromiseProtectedRejected,
    )
  })
})
