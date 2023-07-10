import * as chroma from 'chroma-js'
import { Color as ChromaColor } from 'chroma-js'

import { RandomFunction } from './Random'

export type Color = number

export type ColorSet = Color[]

export interface ColorGradientLinear {
  linear: true
  direction: number
}

export type ColorGradientSharedSize =
  | 'closest-side'
  | 'closest-corner'
  | 'farthest-side'
  | 'farthest-corner'

export interface ColorGradientRadialCircle {
  circle: true
  circleSize: ColorGradientSharedSize | number
}

export interface ColorGradientRadialEllipseCustomSize {
  horizonalRadius: number
  verticalRadius: number
}

export interface ColorGradientRadialEllipse {
  ellipse: true
  ellipseSize: ColorGradientSharedSize | ColorGradientRadialEllipseCustomSize
}

export interface ColorGradientRadial {
  radial: true
  shape: ColorGradientRadialCircle | ColorGradientRadialEllipse
  horizontalPosition: 'left' | 'center' | 'right' | number
  verticalPosition: 'top' | 'center' | 'bottom' | number
}

export interface ColorGradientColorStop {
  color: Color
  location: number
}

export interface ColorGradient {
  type: ColorGradientLinear | ColorGradientRadial
  // repeating: boolean,
  colorStops: ColorGradientColorStop[]
}

export const BlackAndWhite: ColorSet = [0x000000, 0xffffff]

export const colorTypeToHexString = (color: Color): string => {
  let hexString = color.toString(16)
  while (hexString.length < 6) {
    hexString = `0${hexString}`
  }
  return `#${hexString}`
}

export const colorTypeWithAlphaToHexString = (
  color: Color,
  alpha: number
): string => {
  const hexStringWithHash = colorTypeToHexString(color)
  const alphaValue = 256 * alpha
  let alphaString = alphaValue.toString(16)
  while (alphaString.length < 2) {
    alphaString = `0${alphaString}`
  }
  return hexStringWithHash + alphaString
}

export const colorHexStringToColorType = (color: string): Color => {
  return parseInt(color.replace(/^#/, ''), 16)
}

export const colorGradientToCSS = (colorGradient: ColorGradient): string => {
  const linear = (colorGradient: ColorGradientLinear): string => {
    return `${colorGradient.direction.toString(10)}deg`
  }

  const radialCircle = (colorGradient: ColorGradientRadialCircle): string => {
    let result: string = 'circle'
    if (typeof colorGradient.circleSize === 'number') {
      result += ` ${colorGradient.circleSize.toString(10)}px`
    } else if (typeof colorGradient.circleSize === 'string') {
      result += ` ${colorGradient.circleSize}`
    }
    return result
  }

  const radialEllipse = (colorGradient: ColorGradientRadialEllipse): string => {
    let result: string = 'ellipse '
    const { ellipseSize } = colorGradient
    if (typeof ellipseSize === 'string') {
      result += ` ${ellipseSize}`
    } else {
      result +=
        ` ${ellipseSize.horizonalRadius.toString(10)}px` +
        ` ${ellipseSize.verticalRadius.toString(10)}px`
    }
    return result
  }

  const position = (position: string | number): string => {
    if (typeof position === 'number') {
      return `${(position * 100).toString(10)}%`
    }
    return position
  }

  const radial = (colorGradient: ColorGradientRadial): string => {
    let result: string = ''
    const { shape } = colorGradient
    if ('circle' in shape) {
      result += radialCircle(shape)
    } else {
      result += radialEllipse(shape)
    }
    result += ` at ${position(colorGradient.horizontalPosition)} ${position(
      colorGradient.verticalPosition
    )}`
    return result
  }

  let result: string = ''
  const { type } = colorGradient
  if ('linear' in type) {
    result += `linear-gradient(${linear(type as ColorGradientLinear)}, `
  } else {
    result += `radial-gradient(${radial(type as ColorGradientRadial)}, `
  }

  const colorStops = colorGradient.colorStops.map(
    (colorStop: ColorGradientColorStop): string => {
      return `${colorTypeToHexString(colorStop.color)} ${(
        colorStop.location * 100
      ).toString(10)}%`
    }
  )
  result += colorStops.join(', ')

  result += ')'
  return result
}

export const colorSetToEvenColorGradient = (
  colorSet: ColorSet
): ColorGradient => {
  if (colorSet.length < 0) {
    throw new Error('Color Set is not compatible with Color Gradient')
  }
  const type: ColorGradientLinear = {
    linear: true,
    direction: 90
  }
  const result: ColorGradient = {
    type,
    colorStops: colorSet.map(
      (color: Color, index: number): ColorGradientColorStop => {
        let location: number
        if (index === 0) {
          location = 0.0
        } else if (index === colorSet.length - 1) {
          location = 1.0
        } else {
          location = index / (colorSet.length - 1)
        }
        return {
          color,
          location
        }
      }
    )
  }
  return result
}

// From adorkable-forkable/chroma.js/feature/overrideRandomFunction
declare module 'chroma-js' {
  interface ChromaStatic {
    /**
     * Returns a random color.
     */
    random(randomFunction?: RandomFunction): ChromaColor
  }
}

export const randomColor = (randomFunction?: RandomFunction): Color => {
  const hexString = chroma.random(randomFunction).hex()
  return colorHexStringToColorType(hexString)
}
