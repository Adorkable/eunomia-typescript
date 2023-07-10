export interface URLQueryParameter {
  key: string
  value: string
}

export const parseURLQuery = (
  queryString: string
): URLQueryParameter[] => {
  const pairs = (
    queryString[0] === '?' ? queryString.substr(1) : queryString
  ).split('&')

  return pairs.map((queryStringPair: string) => {
    const pair = queryStringPair.split('=')
    return {
      key: decodeURIComponent(pair[0]),
      value: decodeURIComponent(pair[1]) || ''
    }
  })
}

export const parseURLQueryToObject = (queryString: string): Object => {
  const parameters = parseURLQuery(queryString)

  const result: any = {}

  parameters.forEach((parameter: URLQueryParameter) => {
    result[parameter.key] = parameter.value
  })

  return result
}

export const separateURLQuery = (uri: string): string => {
  const index = uri.indexOf('?')
  return index === -1 ? '' : uri.substr(index)
}

export const encodeURLParameters = (params: URLQueryParameter[]) => {
  return params
    .map((param: URLQueryParameter) => {
      return (
        encodeURIComponent(param.key) + '=' + encodeURIComponent(param.value)
      )
    })
    .join('&')
}

export const encodeURLParametersFromObject = (paramsObject: object): string => {
  return Object.typedKeys(paramsObject)
    .map((key) => {
      const value = paramsObject[key]
      return encodeURIComponent(key) + '=' + encodeURIComponent(value)
    })
    .join('&')
}
