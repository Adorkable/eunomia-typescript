// Based on https://stackoverflow.com/a/61129291

/**
 * Find if an unknown value is within a Typescript safe "union" values array
 * @param value Value to test
 * @param values "Union" values array
 * @returns found value if found
 * @throws `InvalidUnionValueError` if value not found
 * @example
 *   const sheepNames = ['Capn Frisky', 'Mr. Snugs', 'Lambchop'] as const
 *   type SheepName = typeof sheepNames[number]
 *   try {
 *     const validValue: SheepName = findValidUnionValue(JSON.parse('"Capn Frisky"'), sheepNames)
 *   } catch (e) {
 *   if (e instanceof InvalidUnionValueException) {
 *     console.error(e.message)
 *     return
 *   }
 *   throw e
 * }
 */
export function findValidUnionValue<T extends V, V>(
  value: V,
  values: readonly T[]
): T {
  const found = values.find((test) => test === value)
  if (found) {
    return found
  }
  throw new InvalidUnionValueError(value, values)
}

/**
 * Test if an unknown value is within a Typescript safe "union" values array
 * @param value Value to test
 * @param values "Union" values array
 * @returns true if value is valid, otherwise false
 * @rethrows unexpected Errors
 * @example
 *   const sheepNames = ['Capn Frisky', 'Mr. Snugs', 'Lambchop'] as const
 *   type SheepName = typeof sheepNames[number]
 *   if (isValidUnionValue(JSON.parse('"Capn Frisky"'), sheepNames)) {
 *   }
 */
export function isValidUnionValue<T extends V, V>(
  value: V,
  values: readonly T[]
): boolean {
  try {
    findValidUnionValue(value, values)
    return true
  } catch (error) {
    if (error instanceof InvalidUnionValueError) {
      return false
    }
    throw error
  }
}

/** Invalid Union Value Error */
export class InvalidUnionValueError<T> extends Error {
  constructor(private _value: unknown, private _values: readonly T[]) {
    super(`Invalid union value ${_value}`)
  }

  get value(): unknown {
    return this.value
  }

  get values() {
    return this._values
  }
}
