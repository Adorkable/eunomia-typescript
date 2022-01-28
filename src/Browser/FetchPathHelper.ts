import { httpString as httpProtocolResolver } from '../RequestProtocol'

export default (path: string, req?: any): string => {
  if (!req && typeof window === 'undefined') {
    return path
  }
  const host = req
    ? req.headers['x-forwarded-host'] || req.headers.host
    : window.location.host
  const proto = httpProtocolResolver(req)
  return `${proto}://${host}${path}`
}
