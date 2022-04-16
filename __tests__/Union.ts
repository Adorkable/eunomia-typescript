import {
  findValidUnionValue,
  isValidUnionValue,
  InvalidUnionValueError
} from '../src'

const sheepNames = ['Capn Frisky', 'Mr. Snugs', 'Lambchop'] as const
type SheepName = typeof sheepNames[number]

const unsureValidString = JSON.parse('"Capn Frisky"')
const unsureInvalidString = JSON.parse('"Bugs Bunny"')

test('findValidUnionValue', () => {
  const found = findValidUnionValue(unsureValidString, sheepNames)
  expect(found).toEqual(unsureValidString)

  expect(() => {
    findValidUnionValue(unsureInvalidString, sheepNames)
  }).toThrow(InvalidUnionValueError)
})

test('isValidUnionValue', () => {
  const shouldBeValid = isValidUnionValue(unsureValidString, sheepNames)
  expect(shouldBeValid).toEqual(true)

  const shouldbeInvalid = isValidUnionValue(unsureInvalidString, sheepNames)
  expect(shouldbeInvalid).toEqual(false)
})
