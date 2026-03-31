import {
  calculateArraySum,
  compareArrayContents,
  hashStringToArrayIndex,
  hashStringToArrayValue,
  mapArrayToIndexMap,
  notEmpty
} from '../src'

test('compareArrayContents', async () => {
  expect(await compareArrayContents([], [])).toBeTruthy()

  expect(await compareArrayContents([], [0])).toBeFalsy()

  expect(await compareArrayContents([0], [])).toBeFalsy()

  expect(await compareArrayContents([0], [0])).toBeTruthy()

  expect(await compareArrayContents([0], [1])).toBeFalsy()

  expect(
    await compareArrayContents(
      [0, 1, 3, 234, 'aldkfj', 34, undefined],
      [0, 1, 3, 234, 'aldkfj', 34, undefined]
    )
  ).toBeTruthy()

  expect(
    await compareArrayContents(
      [0, 1, 3, 234, 'aldkfj', 34, null],
      [0, 1, 3, 234, 'aldkfj', 34, undefined]
    )
  ).toBeFalsy()

  expect(
    await compareArrayContents(
      [0, 1, 3, 234, 'aldkfj', 34, null],
      [0, 1, 3, 1, 'aldkfj', 34, undefined]
    )
  ).toBeFalsy()

  expect(
    await compareArrayContents(
      [0, 1, 3, 1, 'aldkfj', 34, undefined],
      [0, 1, 3, 234, 'aldkfj', 34, undefined]
    )
  ).toBeFalsy()

  expect(
    await compareArrayContents(
      [0, 1, 3, 234, 'aldkfj', 34, null],
      [0, 1, 3, 234, 'aldkfj', 34]
    )
  ).toBeFalsy()
})

test('mapArrayToIndexMap creates index-keyed map', async () => {
  const result = await mapArrayToIndexMap([10, 20, 30])
  expect(result).toEqual({ '0': 10, '1': 20, '2': 30 })
})

test('mapArrayToIndexMap applies mapTo when provided', async () => {
  const result = await mapArrayToIndexMap([10, 20], (value, key) => value + parseInt(key))
  expect(result).toEqual({ '0': 10, '1': 21 })
})

test('mapArrayToIndexMap empty array returns empty map', async () => {
  const result = await mapArrayToIndexMap([])
  expect(result).toEqual({})
})

test('hashStringToArrayIndex returns valid index', () => {
  const array = ['a', 'b', 'c', 'd']
  const index = hashStringToArrayIndex('hello', array)
  expect(index).toBeGreaterThanOrEqual(0)
  expect(index).toBeLessThan(array.length)
})

test('hashStringToArrayIndex is deterministic', () => {
  const array = ['a', 'b', 'c']
  expect(hashStringToArrayIndex('test', array)).toEqual(hashStringToArrayIndex('test', array))
})

test('hashStringToArrayValue returns element from array', () => {
  const array = ['red', 'green', 'blue']
  const value = hashStringToArrayValue('hello', array)
  expect(array).toContain(value)
})

test('hashStringToArrayValue is deterministic', () => {
  const array = ['x', 'y', 'z']
  expect(hashStringToArrayValue('key', array)).toEqual(hashStringToArrayValue('key', array))
})

test('notEmpty returns true for non-null/undefined values', () => {
  expect(notEmpty(0)).toBe(true)
  expect(notEmpty('')).toBe(true)
  expect(notEmpty(false)).toBe(true)
  expect(notEmpty([])).toBe(true)
  expect(notEmpty({})).toBe(true)
})

test('notEmpty returns false for null and undefined', () => {
  expect(notEmpty(null)).toBe(false)
  expect(notEmpty(undefined)).toBe(false)
})

test('calculateArraySum returns sum of numbers', () => {
  expect(calculateArraySum([1, 2, 3, 4, 5])).toEqual(15)
  expect(calculateArraySum([0, 0, 0])).toEqual(0)
  expect(calculateArraySum([-1, 1])).toEqual(0)
  expect(calculateArraySum([100])).toEqual(100)
})
