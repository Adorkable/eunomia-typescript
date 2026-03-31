import {
  addVector2ds,
  createBoundingRectangle2dWithSize,
  createBoundingRectangle2dWithSizeVector2D
} from '../src'

test('addVector2ds adds x and y components', () => {
  expect(addVector2ds({ x: 1, y: 2 }, { x: 3, y: 4 })).toEqual({ x: 4, y: 6 })
  expect(addVector2ds({ x: 0, y: 0 }, { x: 0, y: 0 })).toEqual({ x: 0, y: 0 })
  expect(addVector2ds({ x: -1, y: -2 }, { x: 1, y: 2 })).toEqual({ x: 0, y: 0 })
})

test('addVector2ds with negative values', () => {
  expect(addVector2ds({ x: 5, y: 10 }, { x: -3, y: -7 })).toEqual({ x: 2, y: 3 })
})

test('createBoundingRectangle2dWithSize creates correct bounding rectangle', () => {
  const result = createBoundingRectangle2dWithSize({ x: 0, y: 0 }, 100, 50)
  expect(result.topLeft).toEqual({ x: 0, y: 0 })
  expect(result.bottomRight).toEqual({ x: 100, y: 50 })
})

test('createBoundingRectangle2dWithSize with non-zero top-left', () => {
  const result = createBoundingRectangle2dWithSize({ x: 10, y: 20 }, 100, 50)
  expect(result.topLeft).toEqual({ x: 10, y: 20 })
  expect(result.bottomRight).toEqual({ x: 110, y: 70 })
})

test('createBoundingRectangle2dWithSizeVector2D creates correct bounding rectangle', () => {
  const result = createBoundingRectangle2dWithSizeVector2D({ x: 5, y: 5 }, { x: 10, y: 20 })
  expect(result.topLeft).toEqual({ x: 5, y: 5 })
  expect(result.bottomRight).toEqual({ x: 15, y: 25 })
})

test('createBoundingRectangle2dWithSize and createBoundingRectangle2dWithSizeVector2D are equivalent', () => {
  const a = createBoundingRectangle2dWithSize({ x: 3, y: 7 }, 12, 8)
  const b = createBoundingRectangle2dWithSizeVector2D({ x: 3, y: 7 }, { x: 12, y: 8 })
  expect(a).toEqual(b)
})
