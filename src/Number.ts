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
  return values.reduce((previous, current) => {
    return previous + current
  }) / values.length
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