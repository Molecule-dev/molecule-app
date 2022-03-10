import { timeAgo } from '../timeAgo'

const MINUTE = 60000 + 1
const HOUR = 3600000 + 1
const DAY = 86400000 + 1
const WEEK = 604800000 + 1
const YEAR = 31557600000 + 1

it(`returns "just now"`, () => {
  expect(timeAgo(new Date().getTime())).toBe(`just now`)
})

it(`returns "minute(s)"`, () => {
  expect(timeAgo(new Date().getTime() - MINUTE)).toBe(`1 minute ago`)
  expect(timeAgo(new Date().getTime() - MINUTE*2)).toBe(`2 minutes ago`)
  expect(timeAgo(new Date().getTime() - MINUTE, true)).toBe(`1m ago`)
  expect(timeAgo(new Date().getTime() - MINUTE*2, true)).toBe(`2m ago`)
})

it(`returns "hour(s)"`, () => {
  expect(timeAgo(new Date().getTime() - HOUR)).toBe(`1 hour ago`)
  expect(timeAgo(new Date().getTime() - HOUR*2)).toBe(`2 hours ago`)
  expect(timeAgo(new Date().getTime() - HOUR, true)).toBe(`1h ago`)
  expect(timeAgo(new Date().getTime() - HOUR*2, true)).toBe(`2h ago`)
})

it(`returns "day(s)"`, () => {
  expect(timeAgo(new Date().getTime() - DAY)).toBe(`1 day ago`)
  expect(timeAgo(new Date().getTime() - DAY*2)).toBe(`2 days ago`)
  expect(timeAgo(new Date().getTime() - DAY, true)).toBe(`1d ago`)
  expect(timeAgo(new Date().getTime() - DAY*2, true)).toBe(`2d ago`)
})

it(`returns "week(s)"`, () => {
  expect(timeAgo(new Date().getTime() - WEEK)).toBe(`1 week ago`)
  expect(timeAgo(new Date().getTime() - WEEK*2)).toBe(`2 weeks ago`)
  expect(timeAgo(new Date().getTime() - WEEK, true)).toBe(`1w ago`)
  expect(timeAgo(new Date().getTime() - WEEK*2, true)).toBe(`2w ago`)
})

it(`returns "year(s)"`, () => {
  expect(timeAgo(new Date().getTime() - YEAR)).toBe(`1 year ago`)
  expect(timeAgo(new Date().getTime() - YEAR*2)).toBe(`2 years ago`)
  expect(timeAgo(new Date().getTime() - YEAR, true)).toBe(`1y ago`)
  expect(timeAgo(new Date().getTime() - YEAR*2, true)).toBe(`2y ago`)
})
