export class InvalidNumberStringError extends Error {
  public static Message = 'Invalid number string'

  public invalidNumberString: string
  constructor(invalidNumberString: string) {
    super(InvalidNumberStringError.Message)
    this.invalidNumberString = invalidNumberString
  }
}

export class InvalidNumberSuffixCharacterError extends Error {
  public static Message = 'Invalid number suffix character'

  public invalidNumberSuffixCharacter: string
  constructor(invalidNumberSuffixCharacter: string) {
    super(InvalidNumberSuffixCharacterError.Message)
    this.invalidNumberSuffixCharacter = invalidNumberSuffixCharacter
  }
}

export const parseNumberWithLetterScale = (numberString: string): number => {
  const matches = numberString.match(/([0-9.]+)([a-zA-Z]?)/)
  if (!matches || matches.length < 1) {
    throw new InvalidNumberStringError(numberString)
  }

  let result = parseFloat(matches[1])

  if (matches.length >= 2) {
    let power = 0
    switch (matches[2].toUpperCase()) {
      case 'K':
        power = 3
        break
      case 'M':
        power = 6
        break
      case 'B':
        power = 9
        break
      case '':
        power = 0
        break
      default:
        throw new InvalidNumberSuffixCharacterError(matches[2])
    }
    result *= Math.pow(10, power)
  }

  return result
}

export const parseStringList = (
  stringList: string,
  separator: string | RegExp = /,[ ]*/
): string[] => {
  return stringList.split(separator)
}

export const parseNumberList = (
  numberList: string,
  separator: string | RegExp = /,[ ]*/,
  radix: number = 10
): number[] => {
  return numberList.split(separator).map((value) => {
    return parseInt(value, radix)
  })
}
