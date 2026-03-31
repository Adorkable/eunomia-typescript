import {
  parseNumberWithLetterScale,
  parseStringList,
  parseNumberList,
  InvalidNumberStringError,
  InvalidNumberSuffixCharacterError
} from '../src'

test('parseNumberWithLetterScale plain numbers', () => {
  expect(parseNumberWithLetterScale('100')).toEqual(100)
  expect(parseNumberWithLetterScale('3.14')).toBeCloseTo(3.14)
  expect(parseNumberWithLetterScale('0')).toEqual(0)
})

test('parseNumberWithLetterScale K suffix', () => {
  expect(parseNumberWithLetterScale('1K')).toEqual(1000)
  expect(parseNumberWithLetterScale('2.5K')).toBeCloseTo(2500)
})

test('parseNumberWithLetterScale M suffix', () => {
  expect(parseNumberWithLetterScale('1M')).toEqual(1_000_000)
  expect(parseNumberWithLetterScale('1.5M')).toBeCloseTo(1_500_000)
})

test('parseNumberWithLetterScale B suffix', () => {
  expect(parseNumberWithLetterScale('1B')).toEqual(1_000_000_000)
})

test('parseNumberWithLetterScale lowercase suffix', () => {
  expect(parseNumberWithLetterScale('1k')).toEqual(1000)
  expect(parseNumberWithLetterScale('1m')).toEqual(1_000_000)
  expect(parseNumberWithLetterScale('1b')).toEqual(1_000_000_000)
})

test('parseNumberWithLetterScale throws InvalidNumberSuffixCharacterError for unknown suffix', () => {
  expect(() => parseNumberWithLetterScale('1X')).toThrow(InvalidNumberSuffixCharacterError)
  expect(() => parseNumberWithLetterScale('1Z')).toThrow(InvalidNumberSuffixCharacterError)
})

test('parseStringList with default separator', () => {
  expect(parseStringList('a,b,c')).toEqual(['a', 'b', 'c'])
  expect(parseStringList('a, b, c')).toEqual(['a', 'b', 'c'])
})

test('parseStringList with custom separator', () => {
  expect(parseStringList('a|b|c', '|')).toEqual(['a', 'b', 'c'])
  expect(parseStringList('a;b;c', ';')).toEqual(['a', 'b', 'c'])
})

test('parseStringList single item', () => {
  expect(parseStringList('hello')).toEqual(['hello'])
})

test('parseNumberList with default separator', () => {
  expect(parseNumberList('1,2,3')).toEqual([1, 2, 3])
  expect(parseNumberList('10, 20, 30')).toEqual([10, 20, 30])
})

test('parseNumberList with custom separator', () => {
  expect(parseNumberList('1|2|3', '|')).toEqual([1, 2, 3])
})

test('parseNumberList with custom radix', () => {
  expect(parseNumberList('ff,0a,1b', ',', 16)).toEqual([255, 10, 27])
})
