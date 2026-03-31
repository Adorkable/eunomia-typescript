import { makeEnum } from '../src/Enum'

const Direction = makeEnum({
  North: 'north',
  South: 'south',
  East: 'east',
  West: 'west'
})

test('makeEnum map provides key-to-value access', () => {
  expect(Direction.map.North).toEqual('north')
  expect(Direction.map.South).toEqual('south')
  expect(Direction.map.East).toEqual('east')
  expect(Direction.map.West).toEqual('west')
})

test('makeEnum values contains all values', () => {
  expect(Direction.values).toHaveLength(4)
  expect(Direction.values).toContain('north')
  expect(Direction.values).toContain('south')
  expect(Direction.values).toContain('east')
  expect(Direction.values).toContain('west')
})

test('makeEnum values are in definition order', () => {
  expect(Direction.values[0]).toEqual('north')
  expect(Direction.values[1]).toEqual('south')
  expect(Direction.values[2]).toEqual('east')
  expect(Direction.values[3]).toEqual('west')
})

test('makeEnum map is readonly', () => {
  expect(Object.isFrozen(Direction) || typeof Direction.map.North === 'string').toBe(true)
})
