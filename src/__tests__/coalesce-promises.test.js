const { coalescePromises } = require('../coalesce-promises')
const { PromiseProtectedRejected } = require('../protected-promise')

describe('coalesce-promises', () => {
  test('all resolving', async () => {
    const result = await coalescePromises([
      Promise.resolve(123),
      Promise.resolve(456),
      Promise.resolve(789),
    ])

    expect(result).toEqual(
      expect.objectContaining({
        resolved: [123, 456, 789],
        rejected: expect.any(Array),
      }),
    )
    expect(result.resolved.length).toBe(3)
    expect(result.rejected.length).toBe(0)
  })

  test('all rejecting', async () => {
    const result = await coalescePromises([
      Promise.reject(123),
      Promise.reject(456),
      Promise.reject(789),
    ])

    expect(result).toEqual(
      expect.objectContaining({
        resolved: expect.any(Array),
        rejected: [
          expect.any(PromiseProtectedRejected),
          expect.any(PromiseProtectedRejected),
          expect.any(PromiseProtectedRejected),
        ],
      }),
    )
    expect(result.resolved.length).toBe(0)
    expect(result.rejected.length).toBe(3)
  })

  test('mixed', async () => {
    const result = await coalescePromises([
      Promise.resolve(123),
      Promise.resolve(456),
      Promise.reject(789),
    ])

    expect(result).toEqual(
      expect.objectContaining({
        resolved: [123, 456],
        rejected: [expect.any(PromiseProtectedRejected)],
      }),
    )
    expect(result.resolved.length).toBe(2)
    expect(result.rejected.length).toBe(1)
  })
})
