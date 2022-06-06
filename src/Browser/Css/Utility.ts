export const processCssPropertyToString = <T>(
  key: keyof T,
  formatting: T,
  processor: (key: keyof T, value: any) => string | undefined,
  cssPropertyStringForCssPropertyKey: Record<keyof T, string>
): string | undefined => {
  const value = formatting[key]
  const valueString = processor(key, value)
  if (!valueString) {
    return undefined
  }

  const cssPropertyString = cssPropertyStringForCssPropertyKey[key]
  if (!cssPropertyString) {
    return undefined
  }
  return `${cssPropertyString}: ${valueString};`
}

type Parser<T> = (css: T, separator: string) => string

export const parseCssForElementStyleAttribute = <T>(
  css: T,
  parser: Parser<T>
) => {
  return parser(css, ' ')
}

export const parseCssForStyleElementInline = <T>(css: T, parser: Parser<T>) => {
  return parser(css, '\n')
}
