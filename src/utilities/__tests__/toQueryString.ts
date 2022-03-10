import { toQueryString } from '../toQueryString'

it(`converts any combination of shallow objects and arrays into a query string`, () => {
  expect(toQueryString({
    a: `apples`,
    b: `banana bread`,
    c: [`carrots`, `cauliflower`, `cream cheese`],
    d: [`dates`, `donuts`],
    e: {
      eggs: `scrambled`,
      'english muffin': `toasted`
    },
    f: {
      flour: `oats`,
      fish: `salmon`
    }
  })).toBe(`a=apples&b=banana%20bread&c[]=carrots&c[]=cauliflower&c[]=cream%20cheese&d[]=dates&d[]=donuts&e[eggs]=scrambled&e[english%20muffin]=toasted&f[flour]=oats&f[fish]=salmon`)
})
