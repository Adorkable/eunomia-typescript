import * as seedrandom from 'seedrandom'

import cloneDeep from 'lodash.clonedeep'
import { clamp, mirror, wrap } from './Number'

/**
 * Random function signature
 */
export type RandomFunction = () => number

/**
 * module instance-wide last used Random function
 */
let lastRandomFunction: RandomFunction | null = null

/**
 * Create a seeded `random` function
 * @param seed Random seed
 * @returns seeded `random` function
 */
export const createRandomFunction = (seed: any): RandomFunction => {
  return seedrandom(seed)
}

/**
 * Initialize module instance-wide `random` function
 * @param seed Random seed
 * @returns Module instance-wide `random` function
 */
export const initializeRandom = (seed: any): RandomFunction => {
  lastRandomFunction = createRandomFunction(seed)
  return lastRandomFunction
}

/**
 * Error message returned when calling `random` before it has been initialized
 */
export const randomNoFunctionAvailableError =
  'No random function available, either provide a function or initialize random globally'

/**
 * Error returned when calling `random` before it has been initialized
 */
export class RandomNoFunctionAvailableError extends Error {
  constructor() {
    super(randomNoFunctionAvailableError)
  }
}

/**
 * Selects from an overidden or library-wide initialized random function or fails
 * @param randomFunction an optional override random function
 * @returns selected random function
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
const selectRandomFunction = (randomFunction?: RandomFunction) => {
  if (randomFunction) {
    return randomFunction
  }

  if (lastRandomFunction) {
    return lastRandomFunction
  }

  throw new RandomNoFunctionAvailableError()
}

/**
 * Generate a random number
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated number
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
export const random = (randomFunction?: RandomFunction): number => {
  const use = selectRandomFunction(randomFunction)
  return use()
}

export const randomNumberBetweenValues = (
  minimum: number,
  maximum: number,
  randomFunction?: RandomFunction
): number => {
  return random(randomFunction) * (maximum - minimum + 1) + minimum
}

// TODO: make this actually all characters, too lazy now :P
const AllCharacters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(),./;\'[]\\-=`<>?:"{}|_+~ '
/**
 * Generate a random string
 * @param minimumLength minimum length of returned string, defaults to `0`
 * @param maximumLength maximum length of returned string, defaults to `2^15` (what seems to be a safe value for browsers)
 * @param characterSet optional set of characters to select from randomly
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated string
 */
export const randomString = (
  minimumLength?: number,
  maximumLength?: number,
  characterSet?: string,
  randomFunction?: RandomFunction
): string => {
  const targetLength = Math.floor(
    randomNumberBetweenValues(
      Math.min(minimumLength || 0),
      Math.max(maximumLength || Math.pow(2, 15)),
      randomFunction
    )
  )
  let result = ''
  const useCharacters = characterSet || AllCharacters
  while (result.length < targetLength) {
    const characterIndex = Math.floor(
      randomNumberBetweenValues(0, useCharacters.length, randomFunction)
    )
    result += useCharacters.charAt(characterIndex)
  }
  return result
}

/**
 * Generate a random boolean value
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Randomly generated boolean value
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
export const randomBool = (randomFunction?: RandomFunction): boolean => {
  return random(randomFunction) < 0.5
}

/**
 * Return a random index valid for the provided array
 * @param withinArray Array to return index from
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Valid random index
 * @throws RandomNoFunctionAvailableError if no random function is available
 */
export const randomIndexValueInArray = (
  withinArray: readonly any[],
  randomFunction?: RandomFunction
): number => {
  const portion = withinArray.length * random(randomFunction)
  const rounded = Math.round(portion)
  return rounded % withinArray.length
}

/**
 * Return a random value for the provided array
 * @param withinArray Array to return value from
 * @param randomFunction optionally overridable `random` function, if `void` falls back to the module instance-wide `random` function
 * @returns Random value from the provided array
 */
export const randomValueInArray = <TypeOfValue>(
  withinArray: readonly TypeOfValue[],
  randomFunction?: RandomFunction
): TypeOfValue => {
  return withinArray[randomIndexValueInArray(withinArray, randomFunction)]
}

// TODO: class?
export type ValueAndDrift = {
  value: number
  allowedDrift: number
}

export const appliedRandomDrift = (
  valueAndDrift: ValueAndDrift,
  randomFunction?: RandomFunction
): ValueAndDrift => {
  const result = cloneDeep(valueAndDrift)
  result.value = applyRandomDrift(
    valueAndDrift.value,
    valueAndDrift.allowedDrift,
    randomFunction
  )
  return result
}

export const applyRandomDrift = (
  originalValue: number,
  allowedDrift: number,
  randomFunction?: RandomFunction
): number => {
  return (
    originalValue - allowedDrift / 2.0 + allowedDrift * random(randomFunction)
  )
}

export const applyRandomOffset = (
  originalValue: number,
  offset: number,
  randomFunction?: RandomFunction
): number => {
  return originalValue - offset + offset * 2.0 * random(randomFunction)
}

export enum ClampMethod {
  Clamp = 'clamp',
  Mirror = 'mirror',
  Wrap = 'wrap'
}

export const applyRandomOffsetClamped = (
  originalValue: number,
  offset: number,
  minimum: number,
  maximum: number,
  method?: ClampMethod,
  randomFunction?: RandomFunction
): number => {
  const unclampedResult = applyRandomOffset(
    originalValue,
    offset,
    randomFunction
  )
  switch (method !== undefined ? method : ClampMethod.Clamp) {
    case ClampMethod.Clamp:
      return clamp(unclampedResult, minimum, maximum)

    case ClampMethod.Mirror:
      return mirror(unclampedResult, minimum, maximum)

    case ClampMethod.Wrap:
      return wrap(unclampedResult, minimum, maximum)

    default:
      return unclampedResult
  }
}
