export interface URLQueryParameter {
    key: string;
    value: string;
}

export const parseURLQuery = (queryString: string): Array<URLQueryParameter> => {
  const pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString).split('&')
  return pairs.map((queryStringPair: string) => {
    const pair = queryStringPair.split('=')
    return {
      key: decodeURIComponent(pair[0]),
      value: decodeURIComponent(pair[1]) || ''
    }
  })
}

export const parseURLQueryToObject = (queryString: string): Object => {
  const pairs = (queryString[0] === '?'
    ? queryString.substr(1)
    : queryString).split('&')
  const result: any = {
  }
  pairs.forEach((queryStringPair: string) => {
    const pair = queryStringPair.split('=')
    result[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]) || ''
  })
  return result
}
