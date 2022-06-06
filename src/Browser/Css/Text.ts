import {
  parseCssForElementStyleAttribute,
  parseCssForStyleElementInline,
  processCssPropertyToString
} from './Utility'

export interface Text {
  color?: string
  size?: TextSize
  weight?: number
  fontFamily?: string
  letterSpacing?: string
  lineHeight?: string
  textTransform?: string
  background?: string
}

export type TextSize = string

const cssPropertyStringForTextFormattingKey: Record<keyof Text, string> = {
  color: 'color',
  size: 'font-size',
  weight: 'font-weight',
  letterSpacing: 'letter-spacing',
  lineHeight: 'line-height',
  textTransform: 'text-transform',
  fontFamily: 'font-family',
  background: 'background'
}

const processTextCssPropertyToString = (
  key: string,
  value: any
): string | undefined => {
  if (!value) {
    return undefined
  }
  return `${value}`
}

export const parseTextCss = (css: Text, separator: string = '\n'): string => {
  return Object.keys(css)
    .map((key) =>
      processCssPropertyToString(
        key as keyof Text,
        css,
        processTextCssPropertyToString,
        cssPropertyStringForTextFormattingKey
      )
    )
    .filter((test) => typeof test !== undefined)
    .join(separator)
}

export const parseTextCssForElementStyleAttribute = (css: Text) => {
  return parseCssForElementStyleAttribute(css, parseTextCss)
}

export const parseTextCssForStyleElementInline = (css: Text) => {
  return parseCssForStyleElementInline(css, parseTextCss)
}
