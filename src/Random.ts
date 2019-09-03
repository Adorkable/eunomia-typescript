import seedrandom from 'seedrandom'

import cloneDeep from 'lodash.clonedeep'

export type RandomFunction = () => number;

let lastRandomFunction: RandomFunction | null = null

export const initializeRandomFunction = (seed: any): RandomFunction => {
  return seedrandom(seed)
}

export const initializeRandom = (seed: any): RandomFunction => {
  lastRandomFunction = initializeRandomFunction(seed)
  return lastRandomFunction
}

export const random = (randomFunction?: RandomFunction): number => {
  const selectRandomFunction = () => {
    if (randomFunction) {
      return randomFunction
    }

    if (lastRandomFunction) {
      return lastRandomFunction
    }

    throw new Error('No random function available, either provide a function or initialize random globally')
  }

  const use = selectRandomFunction()
  return use()
}

export const randomString = (randomFunction?: RandomFunction): string => {
  return `${random(randomFunction)}`
}

export const randomBool = (randomFunction?: RandomFunction): boolean => {
  return random(randomFunction) < 0.5
}

export const randomIndexValueInArray = (withinArray: Array<any>, randomFunction?: RandomFunction): number => {
  const portion = withinArray.length * random(randomFunction)
  const rounded = Math.round(portion)
  return rounded % withinArray.length
}

export const randomValueInArray = <TypeOfValue>(withinArray: Array<TypeOfValue>, randomFunction?: RandomFunction): TypeOfValue => {
  return withinArray[randomIndexValueInArray(withinArray, randomFunction)]
}

// TODO: class?
export type ValueAndDrift = {
  value: number;
  allowedDrift: number;
}

export const appliedRandomDrift = (valueAndDrift: ValueAndDrift, randomFunction?: RandomFunction): ValueAndDrift => {
  const result = cloneDeep(valueAndDrift)
  result.value = applyRandomDrift(valueAndDrift.value, valueAndDrift.allowedDrift, randomFunction)
  return result
}

export const applyRandomDrift = (originalValue: number, allowedDrift: number, randomFunction?: RandomFunction): number => {
  return originalValue - (allowedDrift / 2.0) + allowedDrift * random(randomFunction)
}

export const applyRandomOffset = (originalValue: number, offset: number, randomFunction?: RandomFunction): number => {
  return originalValue - offset + (offset * 2.0) * random(randomFunction)
}
