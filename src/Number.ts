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
