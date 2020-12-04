import moment from 'moment'

export const humanReadableDateTimeFormatter = (dateTime: Date | string) => {
  return moment(dateTime).format('ha, MMMM Do, YYYY')
}

export const humanReadableSinceDateTimeFormatter = (
  dateTime: Date | string
) => {
  return moment(dateTime).fromNow()
}
