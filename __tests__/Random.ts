import { createRandomFunction } from '../src/Random'

import { repeatRuns } from '@adorkable/eunomia-typescript-tests'

test('createRandomFunction', () => {
  const seed = Math.random()
  const random1 = createRandomFunction(seed)
  const random2 = createRandomFunction(seed)
  repeatRuns(() => {
    expect(random1()).toEqual(random2())
  })
})
