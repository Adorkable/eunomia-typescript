import { sleep } from '../src'

test('sleep resolves with the specified seconds value', async () => {
  jest.useFakeTimers()

  const promise = sleep(2)
  jest.advanceTimersByTime(2000)
  const result = await promise

  expect(result).toEqual(2)

  jest.useRealTimers()
})

test('sleep resolves after zero seconds', async () => {
  jest.useFakeTimers()

  const promise = sleep(0)
  jest.advanceTimersByTime(0)
  const result = await promise

  expect(result).toEqual(0)

  jest.useRealTimers()
})
