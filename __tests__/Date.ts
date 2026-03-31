import {
  humanReadableDateTimeFormatter,
  humanReadableSinceDateTimeFormatter,
  replaceJapaneseDateKanjis
} from '../src'

test('humanReadableDateTimeFormatter returns expected format', () => {
  const result = humanReadableDateTimeFormatter('2023-06-15T14:00:00')
  expect(result).toMatch(/\d+(am|pm), \w+ \d+(st|nd|rd|th), \d{4}/)
})

test('humanReadableDateTimeFormatter accepts Date object', () => {
  const date = new Date('2023-01-01T09:00:00')
  const result = humanReadableDateTimeFormatter(date)
  expect(typeof result).toEqual('string')
  expect(result.length).toBeGreaterThan(0)
})

test('humanReadableSinceDateTimeFormatter returns a non-empty string', () => {
  const result = humanReadableSinceDateTimeFormatter(new Date())
  expect(typeof result).toEqual('string')
  expect(result.length).toBeGreaterThan(0)
})

test('humanReadableSinceDateTimeFormatter describes past dates', () => {
  const pastDate = new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  const result = humanReadableSinceDateTimeFormatter(pastDate)
  expect(result).toContain('ago')
})

test('replaceJapaneseDateKanjis with default separator', () => {
  expect(replaceJapaneseDateKanjis('2023年01月15日')).toEqual('2023/01/15/')
})

test('replaceJapaneseDateKanjis with custom separator', () => {
  expect(replaceJapaneseDateKanjis('2023年01月15日', '-')).toEqual('2023-01-15-')
})

test('replaceJapaneseDateKanjis with empty separator', () => {
  expect(replaceJapaneseDateKanjis('2023年01月15日', '')).toEqual('20230115')
})

test('replaceJapaneseDateKanjis leaves non-kanji strings unchanged', () => {
  expect(replaceJapaneseDateKanjis('2023-01-15')).toEqual('2023-01-15')
})
