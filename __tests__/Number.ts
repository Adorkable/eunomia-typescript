import { lerp, map } from '../src'

test('lerp', () => {
  expect(lerp(0, 0, 100)).toEqual(0)
  expect(lerp(0.5, 0, 100)).toEqual(50)
  expect(lerp(0.75, 0, 100)).toEqual(75)
  expect(lerp(1, 0, 100)).toEqual(100)

  expect(lerp(0, 100, 0)).toEqual(100)
  expect(lerp(0.5, 100, 0)).toEqual(50)
  expect(lerp(0.75, 100, 0)).toEqual(25)
  expect(lerp(1, 100, 0)).toEqual(0)

  expect(lerp(0.5, 1, 100)).toEqual(50.5)
  expect(lerp(0.5, 50, 100)).toEqual(75)

  expect(lerp(-0.5, 50, 100)).toEqual(25)
  expect(lerp(2, 0, 100)).toEqual(200)
})

test('map', () => {
  expect(map(0, 0, 100, 50, 100)).toEqual(50)
  expect(map(100, 0, 100, 50, 100)).toEqual(100)

  expect(map(-50, 0, 100, 50, 100)).toEqual(25)
  expect(map(200, 0, 100, 50, 100)).toEqual(150)

  expect(map(0, 50, 100, 0, 100)).toEqual(-100)
  expect(map(100, 50, 100, 0, 100)).toEqual(100)
})
