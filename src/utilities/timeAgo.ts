const MINUTE = 60000
const HOUR = 3600000
const DAY = 86400000
const WEEK = 604800000
const YEAR = 31557600000

/**
 * Returns how long ago some time (date) was.
 */
export const timeAgo = (time: number | string, abbreviate?: boolean): string => {
  if (typeof time !== `number`) {
    try {
      time = new Date(time).getTime()
    } catch (error) {
    }
  }

  const diff = Math.max(0, Date.now() - Number(time))
  let count = 0

  if (diff < MINUTE) {
    return `just now`
  } else if (diff < HOUR) {
    count = Math.round(diff / MINUTE)
    return `${count}${abbreviate ? `m` : ` minute${count === 1 ? `` : `s`}`} ago`
  } else if (diff < DAY) {
    count = Math.round(diff / HOUR)
    return `${count}${abbreviate ? `h` : ` hour${count === 1 ? `` : `s`}`} ago`
  } else if (diff < WEEK) {
    count = Math.round(diff / DAY)
    return `${count}${abbreviate ? `d` : ` day${count === 1 ? `` : `s`}`} ago`
  } else if (diff < YEAR) {
    count = Math.round(diff / WEEK)
    return `${count}${abbreviate ? `w` : ` week${count === 1 ? `` : `s`}`} ago`
  } else {
    count = Math.round(diff / YEAR)
    return `${count}${abbreviate ? `y` : ` year${count === 1 ? `` : `s`}`} ago`
  }
}
