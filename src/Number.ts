export const orderMinMax = (
  minimum: number,
  maximum: number
): [number, number] => {
  return [Math.min(minimum, maximum), Math.max(maximum, minimum)]
}

export const orderedMinMaxWrapper = (
  perform: (number: number, minimum: number, maximum: number) => number
): ((number: number, minimum: number, maximum: number) => number) => {
  return (number: number, minimum: number, maximum: number): number => {
    const [useMinimum, useMaximum] = orderMinMax(minimum, maximum)
    return perform(number, useMinimum, useMaximum)
  }
}

/**
 * clamp will automatically flip minimum and maximum if minimum is greater than maximum
 * @param number number to clamp
 * @param minimum minimum value
 * @param maximum maximum value
 */
export const clamp = orderedMinMaxWrapper((number, minimum, maximum) => {
  let result = number

  if (result < minimum) {
    result = minimum
  }
  if (result > maximum) {
    result = maximum
  }

  return result
})

export const mirror = orderedMinMaxWrapper((number, minimum, maximum) => {
  let result = number

  while (result < minimum || result > maximum) {
    if (result < minimum) {
      const difference = minimum - result
      result = minimum + difference
    }
    if (result > maximum) {
      const difference = result - maximum
      result = maximum - difference
    }
  }

  return result
})

export const wrap = orderedMinMaxWrapper((number, minimum, maximum) => {
  let result = number

  while (result < minimum || result > maximum) {
    if (result < minimum) {
      const difference = minimum - result
      result = maximum - difference
    }
    if (result > maximum) {
      const difference = result - maximum
      result = minimum + difference
    }
  }

  return result
})

export const mean = (values: number[]) => {
  return (
    values.reduce((previous, current) => {
      return previous + current
    }) / values.length
  )
}

// Based on: https://stackoverflow.com/a/45309555
export const median = (values: number[]) => {
  if (values.length === 0) {
    return 0
  }

  values.sort((a, b) => {
    return a - b
  })

  const half = Math.floor(values.length / 2)

  if (values.length % 2) {
    return values[half]
  }

  return (values[half - 1] + values[half]) / 2.0
}

/**
 * Linear interpolate a percent between two values
 * @param value amount to interpolate between 0 and 1
 * @param from start of range to interpolate
 * @param to end of range to interpolate
 */
export const lerp = (value: number, from: number, to: number) => {
  return from * (1 - value) + to * value
}

/**
 * Map a value from one range to another
 * @param value value to map from original range
 * @param fromStart start of original range
 * @param fromEnd end of original range
 * @param toStart start of range to map to
 * @param toEnd end of range to map to
 */
export const map = (
  value: number,
  fromStart: number,
  fromEnd: number,
  toStart: number,
  toEnd: number
): number => {
  return (
    toStart + ((value - fromStart) / (fromEnd - fromStart)) * (toEnd - toStart)
  )
}

export const signForValue = (value: number, hidePlus?: boolean) => 
  value > 0
    ? hidePlus ? '' : '+'
    : value < 0 ? '-' : ''