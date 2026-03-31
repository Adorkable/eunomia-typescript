import { getKeyValue, setKeyValue, hasValue } from '../src'

test('getKeyValue simple key', () => {
  expect(getKeyValue({ a: 1 }, 'a')).toEqual(1)
  expect(getKeyValue({ x: 'hello' }, 'x')).toEqual('hello')
})

test('getKeyValue nested key', () => {
  expect(getKeyValue({ a: { b: 42 } }, 'a.b')).toEqual(42)
  expect(getKeyValue({ a: { b: { c: 'deep' } } }, 'a.b.c')).toEqual('deep')
})

test('getKeyValue missing key returns undefined', () => {
  expect(getKeyValue({ a: 1 }, 'b')).toBeUndefined()
})

test('getKeyValue nested missing key returns undefined', () => {
  expect(getKeyValue({ a: { b: 1 } }, 'a.c')).toBeUndefined()
})

test('getKeyValue non-object intermediate returns undefined', () => {
  expect(getKeyValue({ a: 42 }, 'a.b')).toBeUndefined()
})

test('setKeyValue simple key', () => {
  const obj: any = {}
  setKeyValue(obj, 'a', 1)
  expect(obj.a).toEqual(1)
})

test('setKeyValue nested key creates intermediates', () => {
  const obj: any = {}
  setKeyValue(obj, 'a.b', 42)
  expect(obj.a.b).toEqual(42)
})

test('setKeyValue deeply nested key', () => {
  const obj: any = {}
  setKeyValue(obj, 'x.y.z', 'deep')
  expect(obj.x.y.z).toEqual('deep')
})

test('setKeyValue overwrites existing value', () => {
  const obj: any = { a: 1 }
  setKeyValue(obj, 'a', 99)
  expect(obj.a).toEqual(99)
})

test('hasValue returns true for defined values', () => {
  expect(hasValue(0)).toBe(true)
  expect(hasValue('')).toBe(true)
  expect(hasValue(false)).toBe(true)
  expect(hasValue([])).toBe(true)
  expect(hasValue({})).toBe(true)
})

test('hasValue returns false for null and undefined', () => {
  expect(hasValue(null)).toBe(false)
  expect(hasValue(undefined)).toBe(false)
  expect(hasValue()).toBe(false)
})
