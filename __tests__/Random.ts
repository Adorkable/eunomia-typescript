import {
  createRandomFunction,
  initializeRandom,
  random,
  randomBool,
  RandomFunction,
  randomIndexValueInArray,
  RandomNoFunctionAvailableError,
  randomString
} from '../src'

import { repeatRuns } from '@adorkable/eunomia-typescript-tests'

test('random(RandomFunction)', () => {
  const seed = Math.random()
  const random1 = createRandomFunction(seed)
  const random2 = createRandomFunction(seed)
  repeatRuns(() => {
    expect(random(random1)).toEqual(random(random2))
  })
})

test('random()', () => {
  repeatRuns(() => {
    expect(() => {
      random()
    }).toThrowError(RandomNoFunctionAvailableError)
  })
})

test('createRandomFunction', () => {
  const seed = Math.random()
  const random1 = createRandomFunction(seed)
  const random2 = createRandomFunction(seed)
  repeatRuns(() => {
    expect(random1()).toEqual(random2())
  })
})

test('randomString', () => {
  const minimum = Math.floor(Math.random() * 100)
  const maximum = Math.floor(Math.random() * 100)

  // TODO: test min > max
  // TODO: test contents

  initializeRandom('0')

  const betweenMinAndMax = randomString(
    Math.min(minimum, maximum),
    Math.max(minimum, maximum)
  )

  expect(betweenMinAndMax.length).toBeGreaterThanOrEqual(
    Math.min(minimum, maximum)
  )
  expect(betweenMinAndMax.length).toBeLessThanOrEqual(
    Math.max(maximum, minimum)
  )
})

test('randomBool', () => {
  const randomFunction = initializeRandom(Math.random() * 10000)

  const count = Math.random() * 10000
  const testTolerance = 0.1

  let trueCount = 0
  for (let index = 0; index < count; index++) {
    if (randomBool(randomFunction)) {
      trueCount++
    }
  }

  expect(trueCount).toBeGreaterThanOrEqual(count / 2 - count * testTolerance)
  expect(trueCount).toBeLessThanOrEqual(count / 2 + count * testTolerance)
})

const createRandomArray = (length: number, randomFunction: () => number) => {
  const array = new Array(length)
  for (let index = 0; index < length; index++) {
    array[index] = randomFunction()
  }
  return array
}

const createCountArray = (length: number) => {
  return new Array(length).fill(0)
}

const literalArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'] as const
type LiteralArray = typeof literalArray[number]

const expectIndexCount = (array: readonly any[], testTolerance: number, randomFunction: RandomFunction) => {
  const length = array.length

  const count = Math.floor(Math.random() * (length * 10000))
  const indexCount = createCountArray(length)

  for (let index = 0; index < count; index++) {
    const randomIndex = randomIndexValueInArray(array, randomFunction)
    indexCount[randomIndex]++
  }

  const expectedIndexCount = count / length
  const expectedIndexCountTolerance = count * testTolerance

  indexCount.forEach((value) => {
    expect(value).toBeGreaterThanOrEqual(expectedIndexCount - expectedIndexCountTolerance)
    expect(value).toBeLessThanOrEqual(expectedIndexCount + expectedIndexCountTolerance)
  })
}

test('randomIndexValueInArray', () => {
  const randomFunction = initializeRandom(Math.random() * 10000)

  const tolerance = 0.1
  expectIndexCount(createRandomArray(Math.floor(Math.random() * 1000), randomFunction), tolerance, randomFunction)
  expectIndexCount(literalArray, tolerance, randomFunction)
})