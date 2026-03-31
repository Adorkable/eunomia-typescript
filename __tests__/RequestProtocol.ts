import {
  httpString,
  webSocketString,
  httpInsecure,
  httpSecure,
  webSocketInsecure,
  webSocketSecure
} from '../src'

test('httpString with x-forwarded-proto header', () => {
  const req = { headers: { 'x-forwarded-proto': 'https' }, secure: false }
  expect(httpString(req)).toEqual('https')
})

test('httpString with x-forwarded-proto http header', () => {
  const req = { headers: { 'x-forwarded-proto': 'http' }, secure: true }
  expect(httpString(req)).toEqual('http')
})

test('httpString with req.secure true', () => {
  const req = { headers: {}, secure: true }
  expect(httpString(req)).toEqual(httpSecure)
})

test('httpString with req.secure false', () => {
  const req = { headers: {}, secure: false }
  expect(httpString(req)).toEqual(httpInsecure)
})

test('webSocketString with x-forwarded-proto https', () => {
  const req = { headers: { 'x-forwarded-proto': 'https' }, secure: false }
  expect(webSocketString(req)).toEqual(webSocketSecure)
})

test('webSocketString with x-forwarded-proto http', () => {
  const req = { headers: { 'x-forwarded-proto': 'http' }, secure: true }
  expect(webSocketString(req)).toEqual(webSocketInsecure)
})

test('webSocketString with req.secure true', () => {
  const req = { headers: {}, secure: true }
  expect(webSocketString(req)).toEqual(webSocketSecure)
})

test('webSocketString with req.secure false', () => {
  const req = { headers: {}, secure: false }
  expect(webSocketString(req)).toEqual(webSocketInsecure)
})

test('constants have expected values', () => {
  expect(httpInsecure).toEqual('http')
  expect(httpSecure).toEqual('https')
  expect(webSocketInsecure).toEqual('ws')
  expect(webSocketSecure).toEqual('wss')
})
