/**
 * Within web browsers, the `url` is assigned to `window.location.href` if there is no `target`,
 * or `window.open` is called if there is a `target`.
 * 
 * This utility function is a placeholder and should be updated when app platforms are added.
 */
export const openUrl = (url: string, target?: string, features?: string): boolean | void => {
  if (!process.env.REACT_APP_PLATFORM) {
    if (target) {
      window.open(url, target, features)
    } else if (window.top) {
      window.top.location.href = url
    } else {
      window.location.href = url
    }
  }
}
