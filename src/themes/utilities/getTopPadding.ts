/**
 * Gets the necessary top padding value for the platform.
 */
export const getTopPadding = (platform = process.env.REACT_APP_PLATFORM || ``): number => {
  switch (platform?.toLowerCase()) {
    case `ios`:
      return 30

    default:
      return 0
  }
}
