/**
 * Converts a JSON object into query string parameters.
 */
export const toQueryString = (object: JSONObject): string => {
  const pairs: string[] = []

  for (const key in object) {
    const value = object[key]

    if (Array.isArray(value)) {
      for (const item of value) {
        pairs.push(`${encodeURIComponent(key)}[]=${encodeURIComponent(String(item))}`)
      }
    } else if (typeof value === `object`) {
      for (const subKey in value) {
        pairs.push(`${encodeURIComponent(key)}[${encodeURIComponent(subKey)}]=${encodeURIComponent(String(value[subKey]))}`)
      }
    } else {
      pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    }
  }

  return pairs.join(`&`)
}
