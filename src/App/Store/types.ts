/**
 * Store type definitions.
 * 
 * @module
 */

import { VersionState, VersionActions } from './useVersion'

/**
 * The shape of the store.
 */
export type Store = VersionState & VersionActions & {
  status: `initializing` | `ready`
}
