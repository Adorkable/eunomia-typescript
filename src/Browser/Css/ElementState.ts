import {
  parseCssForElementStyleAttribute,
  parseCssForStyleElementInline,
  processCssPropertyToString
} from './Utility'

export interface ElementState {
  background?: string
  color?: string
  opacity?: number
  cursor?: string

  padding?: string
  paddingLeft?: string
  paddingRight?: string
  paddingTop?: string
  paddingBottom?: string
}

const cssPropertyStringForElementStateFormattingKey: Record<
  keyof ElementState,
  string
> = {
  background: 'background',
  color: 'color',
  opacity: 'opacity',
  cursor: 'cursor',
  padding: 'padding',
  paddingLeft: 'padding-left',
  paddingRight: 'padding-right',
  paddingTop: 'padding-top',
  paddingBottom: 'padding-bottom'
}

const processElementStateCssPropertyToString = (
  key: string,
  value: any
): string | undefined => {
  if (!value) {
    return undefined
  }
  return `${value}`
}

export const parseElementStateCss = (
  css: ElementState,
  separator: string = '\n'
): string => {
  return Object.keys(css)
    .map((key) =>
      processCssPropertyToString(
        key as keyof ElementState,
        css,
        processElementStateCssPropertyToString,
        cssPropertyStringForElementStateFormattingKey
      )
    )
    .filter((test) => typeof test !== undefined)
    .join(separator)
}

export const parseElementStateCssForElementStyleAttribute = (
  css: ElementState
) => {
  return parseCssForElementStyleAttribute(css, parseElementStateCss)
}

export const parseElementStateCssForStyleElementInline = (
  css: ElementState
) => {
  return parseCssForStyleElementInline(css, parseElementStateCss)
}
