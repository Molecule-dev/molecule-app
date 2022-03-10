declare namespace NodeJS {
  export interface ProcessEnv {
    /**
     * The current environment.
     *
     * Will always be set to 'production' for [`create-react-app`](https://create-react-app.dev/) builds.
     */
    NODE_ENV?: `development` | `production` | `test`

    /**
     * By default, Create React App will open the default system browser, favoring Chrome on macOS. Specify a [browser](https://github.com/sindresorhus/open#app) to override this behavior, or set it to `none` to disable it completely. If you need to customize the way the browser is launched, you can specify a node script instead. Any arguments passed to `npm start` will also be passed to this script, and the url where your app is served will be the last argument. Your script's file name must have the `.js` extension.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    BROWSER?: string

    /**
     * When the `BROWSER` environment variable is specified, any arguments that you set to this environment variable will be passed to the browser instance. Multiple arguments are supported as a space separated list. By default, no arguments are passed through to browsers.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    BROWSER_ARGS?: string

    /**
     * By default, the development web server binds to all hostnames on the device (`localhost`, LAN network address, etc.). You may use this variable to specify a different host.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    HOST?: string

    /**
     * By default, the development web server will attempt to listen on port 3000 or prompt you to attempt the next available port. You may use this variable to specify a different port.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    PORT?: string

    /**
     * When set to `true`, Create React App will run the development server in `https` mode.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    HTTPS?: string

    /**
     * When set, Create React App will run the development server with a custom websocket hostname for hot module reloading. Normally, `webpack-dev-server` defaults to `window.location.hostname` for the SockJS hostname. You may use this variable to start local development on more than one Create React App project at a time. See [webpack-dev-server](https://webpack.js.org/configuration/dev-server/#devserversockhost) documentation for more details.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    WDS_SOCKET_HOST?: string

    /**
     * When set, Create React App will run the development server with a custom websocket path for hot module reloading. Normally, `webpack-dev-server` defaults to `/sockjs-node` for the SockJS pathname. You may use this variable to start local development on more than one Create React App project at a time. See [webpack-dev-server documentation](https://webpack.js.org/configuration/dev-server/#devserversockpath) for more details.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    WDS_SOCKET_PATH?: string

    /**
     * When set, Create React App will run the development server with a custom websocket port for hot module reloading. Normally, `webpack-dev-server` defaults to `window.location.port` for the SockJS port. You may use this variable to start local development on more than one Create React App project at a time. See [webpack-dev-server documentation](https://webpack.js.org/configuration/dev-server/#devserversockport) for more details.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    WDS_SOCKET_PORT?: string

    /**
     * Create React App assumes your application is hosted at the serving web server's root or a subpath as specified in [`package.json` (`homepage`)](https://create-react-app.dev/docs/advanced-configuration/deployment#building-for-relative-paths). Normally, Create React App ignores the hostname. You may use this variable to force assets to be referenced verbatim to the url you provide (hostname included). This may be particularly useful when using a CDN to host your application.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    PUBLIC_URL?: string

    /**
     * By default, Create React App will output compiled assets to a `/build` directory adjacent to your `/src`. You may use this variable to specify a new path for Create React App to output assets. BUILD_PATH should be specified as a path relative to the root of your project.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    BUILD_PATH?: string

    /**
     * When set to `true`, Create React App treats warnings as failures in the build. It also makes the test runner non-watching. Most CIs set this flag by default.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    CI?: string

    /**
     * When an app crashes in development, you will see an error overlay with clickable stack trace. When you click on it, Create React App will try to determine the editor you are using based on currently running processes, and open the relevant source file. You can [send a pull request to detect your editor of choice](https://github.com/facebook/create-react-app/issues/2636). Setting this environment variable overrides the automatic detection. If you do it, make sure your systems [PATH](https://en.wikipedia.org/wiki/PATH_(variable)) environment variable points to your editor’s bin folder. You can also set it to `none` to disable it completely.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    REACT_EDITOR?: string

    /**
     * When set to `true`, the watcher runs in polling mode, as necessary inside a VM. Use this option if `npm start` isn't detecting changes.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    CHOKIDAR_USEPOLLING?: string

    /**
     * When set to `false`, source maps are not generated for a production build. This solves out of memory (OOM) issues on some smaller machines.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    GENERATE_SOURCEMAP?: string

    /**
     * By default, Create React App will embed the runtime script into `index.html` during the production build. When set to `false`, the script will not be embedded and will be imported as usual. This is normally required when dealing with CSP.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    INLINE_RUNTIME_CHUNK?: string

    /**
     * By default, images smaller than 10,000 bytes are encoded as a data URI in base64 and inlined in the CSS or JS build artifact. Set this to control the size limit in bytes. Setting it to 0 will disable the inlining of images.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    IMAGE_INLINE_SIZE_LIMIT?: string

    /**
     * When set to `false`, disables experimental support for Fast Refresh to allow you to tweak your components in real time without reloading the page.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    FAST_REFRESH?: string

    /**
     * When set to `true`, you can run and properly build TypeScript projects even if there are TypeScript type check errors. These errors are printed as warnings in the terminal and/or browser console.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    TSC_COMPILE_ON_ERROR?: string

    /**
     * When set to `true`, ESLint errors are converted to warnings during development. As a result, ESLint output will no longer appear in the error overlay.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    ESLINT_NO_DEV_ERRORS?: string

    /**
     * When set to `true`, [eslint-webpack-plugin](https://github.com/webpack-contrib/eslint-webpack-plugin) will be completely disabled.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    DISABLE_ESLINT_PLUGIN?: string

    /**
     * When set to `true`, disables the [new JSX transform](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html) introduced in React 17 and backported to React 16.14.0, 15.7.0, and 0.14.10. New projects will use a version of React that supports this by default but you may need to disable it in existing projects if you can't upgrade React.
     *
     * @see https://create-react-app.dev/docs/advanced-configuration/
     */
    DISABLE_NEW_JSX_TRANSFORM?: string

    /**
     * A unique identifier for your app [resembling a Java package name](https://developer.android.com/studio/build/application-id).
     *
     * This should match your API's `APP_ID` environment variable.
     *
     * It's best (easiest) to choose an app ID that you are sure will be unique for every major platform (e.g., iOS and Android).
     *
     * The mobile apps will send the app ID as the `X-Requested-With` header, while the web browser app will not.
     * We use this primarily for determining whether authentication should require a cookie.
     * I.e., if the `X-Requested-With` header doesn't match the app ID, a cookie is required to help prevent XSRF.
     * The mobile apps do not support cookies.
     *
     * @example com.your-app.app
     */
    REACT_APP_ID?: string

    /**
     * The name of the app, typically as specified within `package.json`.
     *
     * @default $npm_package_name
     */
    REACT_APP_NAME?: string

    /**
     * The version number of the app, typically as specified within `package.json`.
     *
     * @default $npm_package_version
     */
    REACT_APP_VERSION?: string

    /**
     * The platform the app is being built for.
     *
     * Leave blank/undefined when building for the web.
     */
    REACT_APP_PLATFORM?: undefined

    /**
     * The API's origin.
     *
     * @example https://api.your-app.com
     * @example http://localhost:4000
     */
    REACT_APP_API_ORIGIN?: string

    /**
     * The web app's origin.
     *
     * @example https://app.your-app.com
     * @example http://localhost:3000
     */
    REACT_APP_WEB_ORIGIN?: string
  }
}
