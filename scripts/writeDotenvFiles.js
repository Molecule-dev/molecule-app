/**
 * Utility to initialize the `.env` files since they aren't committed to git and we want to keep the root directory clean.
 */

const fs = require('fs')
const path = require('path')

const rootPath = path.join(__dirname, `..`)
const envPath = path.join(rootPath, `.env`)
const envCmdrcPath = path.join(rootPath, `.env-cmdrc.json`)

const envFileContents = `NODE_ENV=
REACT_APP_LOG_LEVEL=
REACT_APP_ID=com.your-app.app
REACT_APP_URL_SCHEME=com.your-app.app
REACT_APP_NAME=$npm_package_name
REACT_APP_VERSION=$npm_package_version
REACT_APP_PLATFORM=
REACT_APP_API_ORIGIN=
REACT_APP_WEB_ORIGIN=
`

try {
  if (!fs.existsSync(envPath)) {
    fs.writeFileSync(envPath, envFileContents)
    console.info(`.env file successfully written to disk.`)
  }
} catch (error) {
  console.error(`Error writing .env file:`, error)
}

const envCmdrcFileContents = JSON.stringify({
  'development': {
    NODE_ENV: 'development',
    REACT_APP_API_ORIGIN: 'http://localhost:4000',
    REACT_APP_WEB_ORIGIN: 'http://localhost:3000',
  },
  'production': {
    NODE_ENV: 'production',
    GENERATE_SOURCEMAP: false,
    REACT_APP_API_ORIGIN: 'https://api.your-app.com',
    REACT_APP_WEB_ORIGIN: 'https://app.your-app.com',
  },
  'test': {
    NODE_ENV: 'test',
    REACT_APP_WEB_ORIGIN: 'http://localhost:3000',
  },
}, null, 2)

try {
  if (!fs.existsSync(envCmdrcPath)) {
    fs.writeFileSync(envCmdrcPath, envCmdrcFileContents)
    console.info(`.env-cmdrc file successfully written to disk.`)
  }
} catch (error) {
  console.error(`Error writing .env file:`, error)
}
