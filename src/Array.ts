export const compareArrays = (left: Array<any>, right: Array<any>): boolean => {
  if ((!left && right) || (left && !right)) {
    return false
  }

  if (!Array.isArray(left) || !Array.isArray(right)) {
    return left === right
  }

  if (left.length !== right.length) {
    return false
  }

  return left.reduce((accrued, next) => {
    if (!accrued) {
      return false
    }

    return right.indexOf(next) !== -1
  })
}

export const mapArrayToIndexMap = <ResultType>(items: Array<ResultType>, mapTo?: (value: any, indexKey: string) => ResultType): Object => {
  const result: any = {
  }
  items.forEach((item, index) => {
    const indexKey = index.toString(10)
    if (mapTo) {
      result[indexKey] = mapTo(item, indexKey)
    } else {
      result[indexKey] = item
    }
  })
  return result
}

export const hashStringToArrayIndex = (string: string, array: Array<any>): number => {
  const hash = string.split('').reduce((previous, character) => {
    return character.charCodeAt(0) + previous
  }, 0)
  return hash % array.length
}

export const hashStringToArrayValue = <ValueType>(string: string, array: Array<ValueType>): ValueType => {
  const index = hashStringToArrayIndex(string, array)
  return array[index]
}
