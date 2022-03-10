const { execSync } = require('child_process')

/**
 * When combining various features and platforms, it's easier to combine the
 * relevant `postinstall` scripts here, rather than within `package.json`.
 */
const commands = [
  // Initialize environment
  `npm run write-dotenv-files`,

  // Initialize platform(s)

  // Build
  `npm run build`,

  // Synchronize platform(s)

  // Generate documentation
  `npm run docs`,

  // Do whatever else
]

for (const command of commands) {
  execSync(command, { stdio: [ 0, 1, 2 ] })
}
