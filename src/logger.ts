/**
 * The logger, using `loglevel`.
 * 
 * If you have more complex logging requirements, feel free to swap out `loglevel` with something else in this module.
 * 
 * @see https://www.npmjs.com/package/loglevel
 * 
 * @module
 */

import logger from 'loglevel'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    export interface ProcessEnv {
      /**
       * The log level.
       *
       * @default warn
       */
      REACT_APP_LOG_LEVEL?: `trace` | `debug` | `info` | `warn` | `error` | `silent`
    }
  }
}

if (process.env.REACT_APP_LOG_LEVEL) {
  logger.setLevel(process.env.REACT_APP_LOG_LEVEL)
}

export { logger }
