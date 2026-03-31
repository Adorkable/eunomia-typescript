import {
  flattenMap,
  mapForEach,
  mapMap,
  mapFilter,
  mapMapToArray,
  mapReduce,
  mergeMaps,
  mapsEqual,
  mapIndexMapToArray
} from '../src'

test('flattenMap returns array of values', () => {
  expect(flattenMap({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3])
  expect(flattenMap({})).toEqual([])
  expect(flattenMap({ x: 'hello' })).toEqual(['hello'])
})

test('mapForEach calls callback for each entry', () => {
  const calls: [any, string][] = []
  mapForEach({ a: 1, b: 2 }, (value, key) => calls.push([value, key]))
  expect(calls).toHaveLength(2)
  expect(calls).toContainEqual([1, 'a'])
  expect(calls).toContainEqual([2, 'b'])
})

test('mapForEach on empty object calls no callbacks', () => {
  const calls: any[] = []
  mapForEach({}, (value, key) => calls.push([value, key]))
  expect(calls).toHaveLength(0)
})

test('mapMap transforms values', () => {
  const result = mapMap({ a: 1, b: 2, c: 3 }, (value) => value * 2)
  expect(result).toEqual({ a: 2, b: 4, c: 6 })
})

test('mapMap provides key to callback', () => {
  const result = mapMap({ x: 1 }, (value, key) => `${key}:${value}`)
  expect(result).toEqual({ x: 'x:1' })
})

test('mapFilter keeps entries matching predicate', () => {
  const result = mapFilter({ a: 1, b: 2, c: 3, d: 4 }, (value) => value % 2 === 0)
  expect(result).toEqual({ b: 2, d: 4 })
})

test('mapFilter with no matches returns empty object', () => {
  const result = mapFilter({ a: 1, b: 3 }, (value) => value > 10)
  expect(result).toEqual({})
})

test('mapMapToArray maps object entries to array', () => {
  const result = mapMapToArray({ a: 1, b: 2 }, (value, key) => `${key}=${value}`)
  expect(result).toHaveLength(2)
  expect(result).toContain('a=1')
  expect(result).toContain('b=2')
})

test('mapMapToArray without mapTo returns values', () => {
  const result = mapMapToArray({ a: 10, b: 20 })
  expect(result).toHaveLength(2)
  expect(result).toContain(10)
  expect(result).toContain(20)
})

test('mapReduce accumulates values', () => {
  const result = mapReduce({ a: 1, b: 2, c: 3 }, (acc, value) => acc + value, 0)
  expect(result).toEqual(6)
})

test('mapReduce with string concatenation', () => {
  const result = mapReduce({ a: 'x', b: 'y' }, (acc, value) => acc + value, '')
  expect(result).toHaveLength(2)
  expect(result).toContain('x')
  expect(result).toContain('y')
})

test('mergeMaps combines multiple objects', () => {
  const result = mergeMaps([{ a: 1 }, { b: 2 }, { c: 3 }])
  expect(result).toEqual({ a: 1, b: 2, c: 3 })
})

test('mergeMaps later values overwrite earlier ones', () => {
  const result = mergeMaps([{ a: 1 }, { a: 2 }])
  expect(result).toEqual({ a: 2 })
})

test('mergeMaps with empty array returns empty object', () => {
  const result = mergeMaps([])
  expect(result).toEqual({})
})

test('mapsEqual returns true for identical maps', () => {
  const result = mapsEqual<number>(
    { a: 1, b: 2 },
    { a: 1, b: 2 },
    (l, r) => l === r
  )
  expect(result).toBe(true)
})

test('mapsEqual returns false for different values', () => {
  const result = mapsEqual<number>(
    { a: 1, b: 2 },
    { a: 1, b: 99 },
    (l, r) => l === r
  )
  expect(result).toBe(false)
})

test('mapsEqual returns false when keys differ', () => {
  const result = mapsEqual<number>(
    { a: 1 },
    { b: 1 },
    (l, r) => l === r
  )
  expect(result).toBe(false)
})

test('mapsEqual returns true for empty maps', () => {
  const result = mapsEqual<number>({}, {}, (l, r) => l === r)
  expect(result).toBe(true)
})

test('mapIndexMapToArray returns values sorted by key', () => {
  const result = mapIndexMapToArray({ '2': 'c', '0': 'a', '1': 'b' })
  expect(result).toEqual(['a', 'b', 'c'])
})

test('mapIndexMapToArray applies mapTo if provided', () => {
  const result = mapIndexMapToArray(
    { '0': 10, '1': 20 },
    (value, key) => `${key}:${value}`
  )
  expect(result).toEqual(['0:10', '1:20'])
})
