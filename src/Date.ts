import moment from 'moment'

export const humanReadableDateTimeFormatter = (dateTime: Date | string) => {
  return moment(dateTime).format('ha, MMMM Do, YYYY')
}

export const humanReadableSinceDateTimeFormatter = (
  dateTime: Date | string
) => {
  return moment(dateTime).fromNow()
}

export const replaceJapaneseDateKanjis = (date: string, separator: string = '/') => {
  return date.replace(/年|月|日/g, separator)
}