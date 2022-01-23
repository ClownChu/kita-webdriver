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
    ALLOW_FILE_ACCESS_FROM_FILES: 'allowFileAccessFromFiles',
    USE_FAKE_DEVICE_FOR_MEDIA_STREAM: 'useFakeDeviceForMediaStream',
    USE_FAKE_UI_FOR_MEDIA_STREAM: 'useFakeUIForMediaStream',
    WINDOW_POSITION: 'windowPosition',
    WINDOW_SIZE: 'windowSize',
    DISABLE_GPU: 'disableGPU',
    DISABLE_INFOBARS: 'disableInfobars',
}

module.exports = {
    SupportedCapabilities
}