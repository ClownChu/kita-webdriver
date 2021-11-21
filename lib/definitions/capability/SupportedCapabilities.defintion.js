'use strict'

/**
 * Capabilities supported by this WebDriver
 * @enum {string}
 * @see <>
 */
const SupportedCapabilities = {
    KITA_BROWSER: 'kitaBrowser',
    BROWSER_PROCESS_NAME: 'browserProcessName',
    BROWSER_DISPLAY_NAME: 'browserDisplayName',
    REMOTE_DEBUGGING_PROTOCOL: 'remoteDebuggingProtocol',
    REMOTE_DEBUGGING_HOSTNAME: 'remoteDebuggingHostname',
    REMOTE_DEBUGGING_PORT: 'remoteDebuggingPort',
    APP_URL: 'appUrl',
    USER_DATA_DIR: 'userDataDir',
    PRIVATE_MODE: 'privateMode',
    HEADLESS_MODE: 'headlessMode',
    START_URL: 'startUrl',
}

module.exports = {
    SupportedCapabilities
}