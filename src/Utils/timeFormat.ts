import { formatDistanceToNow, parseISO } from 'date-fns'
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz'

const convertISOTimeToUserTimeZone = (isoTime: string, options?: any): string => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone // User's browser time zone
  const parsedTime = parseISO(isoTime)
  const zonedTime = utcToZonedTime(parsedTime, userTimeZone)
  const utcTime = zonedTimeToUtc(zonedTime, 'UTC') // Convert to UTC time zone
  const formattedTime = formatDistanceToNow(utcTime, { addSuffix: true, ...options })

  return formattedTime
}
export default convertISOTimeToUserTimeZone
