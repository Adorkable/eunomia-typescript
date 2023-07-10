export const compareArrayContents = async (
  left: readonly any[],
  right: readonly any[]
): Promise<boolean> => {
  if (left.length !== right.length) {
    return false
  }

  if (
    !left.reduce((accrued, next) => {
      if (!accrued) {
        return false
      }

      return right.indexOf(next) !== -1
    }, true)
  ) {
    return false
  }

  return right.reduce((accrued, next) => {
    if (!accrued) {
      return false
    }

    return left.indexOf(next) !== -1
  }, true)
}

export const mapArrayToIndexMap = async <ArrayValueType>(
  items: readonly ArrayValueType[],
  mapTo?: (value: ArrayValueType, indexKey: string) => ArrayValueType
): Promise<Record<string, ArrayValueType>> => {
  const result: Record<string, ArrayValueType> = {}

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

export const hashStringToArrayIndex = (
  string: string,
  array: readonly any[]
): number => {
  const hash = string.split('').reduce((previous, character) => {
    return character.charCodeAt(0) + previous
  }, 0)
  return hash % array.length
}

export const hashStringToArrayValue = <ValueType>(
  string: string,
  array: readonly ValueType[]
): ValueType => {
  const index = hashStringToArrayIndex(string, array)
  return array[index]
}

export const notEmpty = <TValue>(
  value: TValue | null | undefined
): value is TValue => {
  if (value === null || value === undefined) {
    return false
  }
  const testDummy: TValue = value
  return true
}
