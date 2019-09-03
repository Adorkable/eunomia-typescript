import union from 'lodash.union'

export const flattenMap = <ResultType>(items: any): Array<ResultType> => {
  const ids = Object.keys(items)
  return ids.map((id) => {
    return items[id]
  })
}

export const mapForEach = (items: any, forEach: (value: any, key: string) => void) => {
  const keys = Object.keys(items)
  keys.forEach((key) => {
    const originalValue = items[key]
    forEach(originalValue, key)
  })
}

export const mapMap = (items: Object, mapTo: (value: any, key: string) => any): Object => {
  const result: any = {
  }

  mapForEach(items, (value: any, key: string) => {
    result[key] = mapTo(value, key)
  })
  return result
}

export const mapFilter = (items: Object, include: (value: any, key: string) => boolean): Object => {
  const result: any = {
  }

  mapForEach(items, (value: any, key: string) => {
    if (include(value, key) === true) {
      result[key] = value
    }
  })
  return result
}

export const mapMapToArray = <ResultType>(items: Object, mapTo?: (value: any, key: string) => ResultType): Array<ResultType> => {
  const result: Array<ResultType> = []

  mapForEach(items, (value: any, key: string) => {
    if (mapTo) {
      result.push(mapTo(value, key))
    } else {
      result.push(value)
    }
  })
  return result
}

export const mapReduce = <ResultType>(items: Object, reducer: (accumulatedValue: ResultType, currentItem: any, currentKey: string) => ResultType, initialValue: ResultType): ResultType => {
  let accumulatedValue = initialValue

  mapForEach(items, (value: any, key: string) => {
    accumulatedValue = reducer(accumulatedValue, value, key)
  })

  return accumulatedValue
}

export const mergeMaps = (itemsArray: Array<Object>): Object => {
  return itemsArray.reduce((merged: any, currents: Object) => {
    mapForEach(currents, (value, id) => {
      merged[id] = value
    })
    return merged
  }, {
  })
}

export const mapsEqual = <ResultType>(leftItems: any, rightItems: any, isEqual: (leftItem: ResultType, rightItem: ResultType) => boolean): boolean => {
  let result: boolean = true

  const ids = union(Object.keys(leftItems), Object.keys(rightItems))
  for (let index = 0; index < ids.length; index += 1) {
    const id = ids[index]
    const leftItem: ResultType = leftItems[id]
    const rightItem: ResultType = rightItems[id]
    if (leftItem && rightItem) {
      result = isEqual(leftItem, rightItem)
      if (!result) {
        break
      }
    } else if (!leftItem && !rightItem) {
      continue
    } else {
      result = false
      break
    }
  }
  return result
}

export const mapIndexMapToArray = <ResultType>(indexMap: any, mapTo?: (value: any, indexKey: string) => ResultType): Array<ResultType> => {
  const indexKeys = Object.keys(indexMap).sort()
  return indexKeys.map((indexKey) => {
    const value = indexMap[indexKey]
    if (mapTo) {
      return mapTo(value, indexKey)
    }
    return value
  })
}
