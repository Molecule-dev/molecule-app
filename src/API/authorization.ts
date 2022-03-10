/**
 * Methods for API authorization management.
 * 
 * @module
 */

import { AxiosError, AxiosResponse } from 'axios'
import { client } from './client'

/**
 * Sets the `Authorization` header on the API client (`axios` instance)
 * and saves it within `localStorage`.
 */
export const setHeader = (authorizationHeader: string = window.localStorage.getItem(`authorizationHeader`) || ``): void => {
  if (authorizationHeader) {
    client.defaults.headers.common.Authorization = authorizationHeader
    window.localStorage.setItem(`authorizationHeader`, authorizationHeader)
  }
}

/**
 * Removes the `Authorization` header from the API client (`axios` instance)
 * and removes it from `localStorage`.
 */
export const removeHeader = (): void => {
  if (client.defaults.headers) {
    delete client.defaults.headers.common.Authorization
  }
  window.localStorage.removeItem(`authorizationHeader`)
}

export type interceptResponseProps = {
  /**
   * Called when the `Authorization` header is set.
   */
  onSet?: () => void
}

/**
 * If the `Set-Authorization` header is included in the response,
 * sets the header and user ID to device ID.
 */
export const interceptResponse = ({ onSet }: interceptResponseProps = {}) => (response: AxiosResponse): AxiosResponse => {
  if (response.headers[`set-authorization`]) {
    setHeader(response.headers[`set-authorization`])

    if (onSet) {
      onSet()
    }
  }

  return response
}

export type interceptErrorProps = {
  /**
   * Called when the `Authorization` header is set.
   */
  onSet?: () => void
  /**
   * Called when the `Authorization` header is removed.
   */
  onRemove?: () => void
}

/**
 * Removes the `Authorization` header if the response status code is `401`,
 * or if the `Set-Authorization` header is included in the error response,
 * sets the header and user ID to device ID.
 */
export const interceptError = ({ onSet, onRemove }: interceptErrorProps = {}) => (error: AxiosError): Promise<AxiosError> => {
  if (error?.response?.status === 401) {
    removeHeader()

    if (onRemove) {
      onRemove()
    }
  } else if (error?.response?.headers[`set-authorization`]) {
    setHeader(error.response.headers[`set-authorization`])

    if (onSet) {
      onSet()
    }
  }

  return Promise.reject(error)
}
