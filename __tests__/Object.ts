import '../src/Object'

test('Object.typedKeys returns keys of an object', () => {
  const obj = { a: 1, b: 2, c: 3 }
  const keys = Object.typedKeys(obj)
  expect(keys).toHaveLength(3)
  expect(keys).toContain('a')
  expect(keys).toContain('b')
  expect(keys).toContain('c')
})

test('Object.typedKeys on empty object returns empty array', () => {
  expect(Object.typedKeys({})).toEqual([])
})

test('Object.typedKeys preserves order', () => {
  const obj = { x: 10, y: 20, z: 30 }
  expect(Object.typedKeys(obj)).toEqual(['x', 'y', 'z'])
})
