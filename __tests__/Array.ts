import { compareArrayContents, mapArrayToIndexMap } from '../src'

test('compareArrayContents', async () => {
  expect(await compareArrayContents([], [])).toBeTruthy()

  expect(await compareArrayContents([], [0])).toBeFalsy()

  expect(await compareArrayContents([0], [])).toBeFalsy()

  expect(await compareArrayContents([0], [0])).toBeTruthy()

  expect(await compareArrayContents([0], [1])).toBeFalsy()

  expect(
    await compareArrayContents(
      [0, 1, 3, 234, 'aldkfj', 34, undefined],
      [0, 1, 3, 234, 'aldkfj', 34, undefined]
    )
  ).toBeTruthy()

  expect(
    await compareArrayContents(
      [0, 1, 3, 234, 'aldkfj', 34, null],
      [0, 1, 3, 234, 'aldkfj', 34, undefined]
    )
  ).toBeFalsy()

  expect(
    await compareArrayContents(
      [0, 1, 3, 234, 'aldkfj', 34, null],
      [0, 1, 3, 1, 'aldkfj', 34, undefined]
    )
  ).toBeFalsy()

  expect(
    await compareArrayContents(
      [0, 1, 3, 1, 'aldkfj', 34, undefined],
      [0, 1, 3, 234, 'aldkfj', 34, undefined]
    )
  ).toBeFalsy()

  expect(
    await compareArrayContents(
      [0, 1, 3, 234, 'aldkfj', 34, null],
      [0, 1, 3, 234, 'aldkfj', 34]
    )
  ).toBeFalsy()
})

const compareArrayToIndexMap = <ValueType>(
  array: Array<ValueType>,
  indexMap: Record<string, ValueType>,
  mapTo?: (value: any, indexKey: string) => ValueType
) => {
  const resultKeys = Object.keys(indexMap)

  array.forEach((item, index) => {
    const itemKey = index.toString(10)

    expect(resultKeys.indexOf(itemKey)).not.toEqual(-1)
    expect(indexMap[itemKey]).toEqual(mapTo ? mapTo(item, itemKey) : item)

    resultKeys.splice(resultKeys.indexOf(itemKey), 1)
  })

  expect(resultKeys.length).toEqual(0)
}

test('mapArrayToIndexMap', async () => {
  const items = [1, 2, 3, 4, 5, 6, 7]

  const result = await mapArrayToIndexMap(items)

  compareArrayToIndexMap(items, result)
})

test('mapArrayToIndexMapWithMapTo', async () => {
  const items = [1, 2, 3, 4, 5, 6, 7]

  const mapTo = (item: any, indexKey: string) => {
    return item.toString(10) + '_' + indexKey
  }
  const result = await mapArrayToIndexMap(items, mapTo)

  compareArrayToIndexMap(items, result, mapTo)
})
