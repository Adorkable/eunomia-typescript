import { lerp, map, orderMinMax, clamp, mirror, wrap, mean, median, signForValue } from '../src'

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

test('orderMinMax returns [min, max]', () => {
  expect(orderMinMax(1, 10)).toEqual([1, 10])
  expect(orderMinMax(10, 1)).toEqual([1, 10])
  expect(orderMinMax(5, 5)).toEqual([5, 5])
})

test('clamp within range', () => {
  expect(clamp(5, 0, 10)).toEqual(5)
})

test('clamp below minimum', () => {
  expect(clamp(-5, 0, 10)).toEqual(0)
})

test('clamp above maximum', () => {
  expect(clamp(15, 0, 10)).toEqual(10)
})

test('clamp flips min/max if inverted', () => {
  expect(clamp(5, 10, 0)).toEqual(5)
  expect(clamp(-1, 10, 0)).toEqual(0)
  expect(clamp(15, 10, 0)).toEqual(10)
})

test('mirror reflects value back into range', () => {
  expect(mirror(15, 0, 10)).toEqual(5)
  expect(mirror(-5, 0, 10)).toEqual(5)
  expect(mirror(5, 0, 10)).toEqual(5)
})

test('wrap wraps value around range', () => {
  expect(wrap(11, 0, 10)).toEqual(1)
  expect(wrap(-1, 0, 10)).toEqual(9)
  expect(wrap(5, 0, 10)).toEqual(5)
})

test('mean returns average', () => {
  expect(mean([1, 2, 3, 4, 5])).toEqual(3)
  expect(mean([0, 10])).toEqual(5)
  expect(mean([7])).toEqual(7)
})

test('median returns middle value for odd-length array', () => {
  expect(median([3, 1, 2])).toEqual(2)
  expect(median([5])).toEqual(5)
})

test('median returns average of two middle values for even-length array', () => {
  expect(median([1, 2, 3, 4])).toEqual(2.5)
  expect(median([1, 3])).toEqual(2)
})

test('median returns 0 for empty array', () => {
  expect(median([])).toEqual(0)
})

test('signForValue positive', () => {
  expect(signForValue(5)).toEqual('+')
  expect(signForValue(0.1)).toEqual('+')
})

test('signForValue positive with hidePlus', () => {
  expect(signForValue(5, true)).toEqual('')
})

test('signForValue negative', () => {
  expect(signForValue(-5)).toEqual('-')
  expect(signForValue(-5, true)).toEqual('-')
})

test('signForValue zero', () => {
  expect(signForValue(0)).toEqual('')
})

test('map', () => {
  expect(map(0, 0, 100, 50, 100)).toEqual(50)
  expect(map(100, 0, 100, 50, 100)).toEqual(100)

  expect(map(-50, 0, 100, 50, 100)).toEqual(25)
  expect(map(200, 0, 100, 50, 100)).toEqual(150)

  expect(map(0, 50, 100, 0, 100)).toEqual(-100)
  expect(map(100, 50, 100, 0, 100)).toEqual(100)
})
