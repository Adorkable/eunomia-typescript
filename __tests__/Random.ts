import {
  createRandomFunction,
  initializeRandom,
  random,
  randomBool,
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
