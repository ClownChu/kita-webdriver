'use strict'

const { exec } = require('child_process')
const axios = require('axios')

const { KitaSession } = require('../KitaSession')
const { ErrorTypes } = require('../types')
const { CapabilityDefinitions, KitaDefinitions } = require('../definitions')
const { SystemHelper } = require('../helpers/System.helper')
const { WebSocketHelper } = require('../helpers/WebSocket.helper')


/**
 * Provides with methods to assist with operations in Chrominium based browsers
 */
class ChrominiumHelper {
    /**
     * @static Initiate a new instance of a Chrominium based browser
     * @param {KitaCapabilities} capabilities Chrominium based browser capabilities
     * @returns a {@link Promise}.
     * `resolve` to {@link KitaSession} if instance can be started sucessfully.
     * `reject` with Errors
     */
    static new(capabilities) {
        const launchOptions = ChrominiumHelper.getLaunchOptions(capabilities)   
        return new Promise((resolve, reject) => {
            exec(launchOptions.join(' '), (err) => {
                if (err) {
                  reject(err)
                }

                /** TODO : Instead of sleep, verify that debugger has become available */
                SystemHelper.sleep(1000).then(() => {
                    ChrominiumHelper.getSessions(capabilities).then((sessions) => {
                        resolve(sessions.values().next().value)
                    }, (err) => {
                        reject(err)
                    })
                })
            })
        })
    }

    /**
     * @static Get Chrominium based browser launch options based on {@link KitaCapabilities}
     * @param {KitaCapabilities} capabilities Chrominium based browser capabilities
     * @returns {string[]} Options to launch the browser based on desired capabilities
     */
    static getLaunchOptions(capabilities) {
        const browserProcessName = capabilities.get(CapabilityDefinitions.SupportedCapabilities.BROWSER_PROCESS_NAME)
        const remoteDebuggingPort = capabilities.get(CapabilityDefinitions.SupportedCapabilities.REMOTE_DEBUGGING_PORT)

        const launchOptions = [
            'start',
            browserProcessName,
            'data:,',
            `--remote-debugging-port=${remoteDebuggingPort}`
        ]
            
        const appUrl = capabilities.get(CapabilityDefinitions.SupportedCapabilities.APP_URL)
        /** TODO : Validation helper */
        if (appUrl !== undefined && appUrl.length > 0) {
            launchOptions.push(`--app=${appUrl}`)
        }

        let privateMode = capabilities.get(CapabilityDefinitions.SupportedCapabilities.PRIVATE_MODE)
        const headlessMode = capabilities.get(CapabilityDefinitions.SupportedCapabilities.HEADLESS_MODE)
        
        /** TODO : Validation helper */
        if (headlessMode !== undefined && headlessMode) {
            launchOptions.push(`--headless`)
            privateMode = false
        }

        /** TODO : Validation helper */
        if (privateMode !== undefined && privateMode) {
            if (browserProcessName === KitaDefinitions.SupportedBrowsers.EDGE) {
                launchOptions.push(`--inprivate`)
            } else {
                launchOptions.push(`--incognito`)
            }
        } else {
            const userDataDir = capabilities.get(CapabilityDefinitions.SupportedCapabilities.USER_DATA_DIR)
            if (userDataDir !== undefined) {
            launchOptions.push(`--user-data-dir=${userDataDir}`)
            }
        }

        /**
         * TODO : Headless mode
         */

        return launchOptions
    }

    /**
     * @static Get all available debugging sessions for Chrominium based browsers
     * @param {KitaCapabilities} capabilities Chrominium based browser capabilities
     * @param {boolean} pagesOnly If `true` only page sessions will return
     * @returns a {@link Promise}.
     * `resolve` to {@link Map<string, KitaSession>} if sessions can be retrieved sucessfully.
     * `reject` with Errors
     */
    static getSessions(capabilities, pagesOnly = true) {        
        const debuggingUrl = capabilities.buildDebuggingUrl()
        return new Promise((resolve, reject) => {
            const sessions = new Map()
            axios.get(`${debuggingUrl}/json`).then((response) => {
                for (let s = 0; response.data.length > s; s++) {
                    const session = response.data[s]
                    if (session.devtoolsFrontendUrl !== null) {
                        if (pagesOnly && session.type === 'page') {
                            sessions.set(session.id.toString(), new KitaSession(session))
                        } else if (!pagesOnly) {
                            sessions.set(session.id.toString(), new KitaSession(session))
                        }
                    }        
                }

                resolve(sessions)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    /**
     * @static Navigates to URL using `window.location`
     * @param {KitaBrowser} instance Chrominium based browser instance
     * @param {string} url URL to navigate 
     * @returns a {@link Promise}.
     * `resolve` to {@link KitaBrowser}, if the navigation is completed.
     * `reject` with {@link ErrorTypes.NavigationFailed}, if the result URL is different from `url`
     */
    static navigate(instance, url) {
        /**
         * TODO : A better way to create message JSON object
         */
         return new Promise((resolve, reject) => {
            WebSocketHelper.sendMessage(
                instance.session.information.webSocketDebuggerUrl, 
                {          
                    id: 1,
                    method: "Page.navigate",
                    params: {
                        url: url
                    }
                }, 
                'json'
            ).then((response) => {
                if (typeof response.result !== 'undefined') {
                    resolve(instance)
                }
                reject(new ErrorTypes.NavigationFailed(url))
            }, (err) => {
                reject(new ErrorTypes.NavigationFailed(url, err))
            })
        })
    }
      
    /**
     * @static Eval scripts in {@link KitaSession} console window
     * @param {KitaBrowser} instance Chrominium based browser instance
     * @param {string} script script to be executed
     * @param {int} timeout timeout for script execution
     * @returns a {@link Promise}.
     * `resolve` to {@link Object} with of console result.
     * `reject` with {@link ErrorTypes.EvalFailed}
     */
    static eval(instance, script, timeout = 30 * 1000) {
        const expression = `
            window.kitaExec = () => {   
                setTimeout(() => {
                    delete window.kitaExec
                }, 0)

                ${script}
            }
            window.kitaExec()
        `

        /**
         * TODO : A better way to create message JSON object
         */
        return new Promise((resolve, reject) => {
            WebSocketHelper.sendMessage(
                instance.session.information.webSocketDebuggerUrl, 
                {          
                    id: 1,
                    method: "Runtime.evaluate",
                    params: {
                        expression: expression,
                        objectGroup: "console",
                        includeCommandLineAPI: true,
                        doNotPauseOnExceptions: false,
                        returnByValue: false,
                        timeout: timeout
                    }
                }, 
                'json'
            ).then((response) => {
                resolve(response.result.result)
            }, (err) => {
                reject(err)
            })
        })
    }
      
    /**
     * @static Close {@link KitaSession}
     * @param {KitaBrowser} instance Chrominium based browser instance
     * @returns a {@link Promise}.
     * `resolve` to {@link Object} with of console result.
     * `reject` with {@link ErrorTypes.FailedToClose}
     */
    static close(instance) {
        /**
         * TODO : A better way to create message JSON object
         */
        return new Promise((resolve, reject) => {
            WebSocketHelper.sendMessage(
                instance.session.information.webSocketDebuggerUrl, 
                {          
                    id: 1,
                    method: "Browser.close",
                }, 
                'json'
            ).then((response) => {
                resolve(response)
            }, (err) => {
                reject(err)
            })
        })
    }
      
    /**
     * Capture screenshot from the {@link KitaSession} instance
     * @returns a {@link Promise}.
     * `resolve` to base64 encoded {@link string} of screenshot.
     * `reject` with {@link ErrorTypes.FailedToCapture}
     */
    static captureScreenshot(instance, format = 'jpeg', quality = 100) {
        /**
         * TODO : A better way to create message JSON object
         */
        return new Promise((resolve, reject) => {
            WebSocketHelper.sendMessage(
                instance.session.information.webSocketDebuggerUrl, 
                {          
                    id: 1,
                    method: "Page.captureScreenshot",
                    params: {
                        format: format,
                        quality: quality
                    }
                }, 
                'json'
            ).then((response) => {
                resolve(response.result.data)
            }, (err) => {
                reject(err)
            })
        })
    }
}

module.exports = {
    ChrominiumHelper
}