import { createRandomFunction, initializeRandom, randomString } from '../lib'

import { repeatRuns } from '@adorkable/eunomia-typescript-tests'

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

  initializeRandom("0")

  const betweenMinAndMax = randomString(Math.min(minimum, maximum), Math.max(minimum, maximum))

  expect(betweenMinAndMax.length).toBeGreaterThanOrEqual(Math.min(minimum, maximum))
  expect(betweenMinAndMax.length).toBeLessThanOrEqual(Math.max(maximum, minimum))
})