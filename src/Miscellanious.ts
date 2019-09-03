// TODO: should be '/' instead of '.'? or both?
export const getKeyValue = (from: any, key: string): any => {
  const nesting = key.split('.')
  if (nesting.length > 0) {
    let within = from
    for (let index = 0; index < nesting.length; index += 1) {
      if (index === nesting.length - 1) {
        return within[nesting[index]]
      } else if (typeof within[nesting[index]] === 'object') {
        within = within[nesting[index]]
      } else {
        return undefined
      }
    }
  }
  return from[key]
}

export const setKeyValue = (to: any, key: string, value: any) => {
  const nesting = key.split('.')
  if (nesting.length > 0) {
    let within = to
    for (let index = 0; index < nesting.length; index += 1) {
      if (index === nesting.length - 1) {
        within[nesting[index]] = value
        break
      } else {
        if (typeof within[nesting[index]] !== 'object') {
          within[nesting[index]] = {
          }
        }
        within = within[nesting[index]]
      }
    }
  } else {
    to[key] = value
  }
}

export const hasValue = (test?: any): boolean => {
  return typeof test !== 'undefined' && test !== null
}
