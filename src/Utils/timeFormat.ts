import { formatDistanceToNow, parseISO } from 'date-fns'

const convertISOTimeToUserTimeZone = (isoTime: string, options?: any): string => {
  const formattedTime = formatDistanceToNow(parseISO(isoTime), options)

  return formattedTime
}
export default convertISOTimeToUserTimeZone
