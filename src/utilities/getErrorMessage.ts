export type VariableError = null | string | {
  code?: string | number
  message?: string
  response?: {
    statusText?: string
    data?: {
      error?: string
    }
  }
}

/**
 * Attempts to return a human readable message based on some `Error`.
 */
export const getErrorMessage = (error?: VariableError): string | null => {
  if (!error) {
    return null
  }

  if (typeof error === `string`) {
    return error
  }

  return (
    ({ ETIMEDOUT: `Timed out`, ECONNABORTED: `Connection aborted` })[error.code || -1]
      || error.response?.data?.error
      || error.message
      || null
  )
}
