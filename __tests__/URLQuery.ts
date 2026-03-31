import '../src/Object'
import {
  parseURLQuery,
  parseURLQueryToObject,
  separateURLQuery,
  encodeURLParameters,
  encodeURLParametersFromObject
} from '../src'

test('parseURLQuery with leading ?', () => {
  const result = parseURLQuery('?key=value&other=123')
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({ key: 'key', value: 'value' })
  expect(result[1]).toEqual({ key: 'other', value: '123' })
})

test('parseURLQuery without leading ?', () => {
  const result = parseURLQuery('key=value')
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({ key: 'key', value: 'value' })
})

test('parseURLQuery decodes URI components', () => {
  const result = parseURLQuery('key=hello%20world&name=foo%26bar')
  expect(result[0]).toEqual({ key: 'key', value: 'hello world' })
  expect(result[1]).toEqual({ key: 'name', value: 'foo&bar' })
})

test('parseURLQueryToObject returns key-value map', () => {
  const result = parseURLQueryToObject('?foo=1&bar=2') as any
  expect(result.foo).toEqual('1')
  expect(result.bar).toEqual('2')
})

test('parseURLQueryToObject later keys overwrite earlier', () => {
  const result = parseURLQueryToObject('?key=first&key=second') as any
  expect(result.key).toEqual('second')
})

test('separateURLQuery extracts query string', () => {
  expect(separateURLQuery('http://example.com?foo=bar')).toEqual('?foo=bar')
  expect(separateURLQuery('http://example.com?foo=bar&baz=qux')).toEqual('?foo=bar&baz=qux')
})

test('separateURLQuery returns empty string when no query', () => {
  expect(separateURLQuery('http://example.com')).toEqual('')
  expect(separateURLQuery('http://example.com/')).toEqual('')
})

test('encodeURLParameters encodes key-value pairs', () => {
  const result = encodeURLParameters([
    { key: 'foo', value: 'bar' },
    { key: 'baz', value: 'qux' }
  ])
  expect(result).toEqual('foo=bar&baz=qux')
})

test('encodeURLParameters encodes special characters', () => {
  const result = encodeURLParameters([
    { key: 'hello world', value: 'foo&bar' }
  ])
  expect(result).toEqual('hello%20world=foo%26bar')
})

test('encodeURLParametersFromObject encodes object properties', () => {
  const result = encodeURLParametersFromObject({ foo: 'bar', baz: 'qux' })
  expect(result).toContain('foo=bar')
  expect(result).toContain('baz=qux')
  expect(result).toContain('&')
})

test('encodeURLParameters roundtrips with parseURLQuery', () => {
  const original = [
    { key: 'name', value: 'Alice' },
    { key: 'age', value: '30' }
  ]
  const encoded = encodeURLParameters(original)
  const parsed = parseURLQuery(encoded)
  expect(parsed).toEqual(original)
})
