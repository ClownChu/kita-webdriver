'use strict'

const { KitaBrowser } = require('./../KitaBrowser')
const { CapabilityDefinitions } = require('../definitions')
const { ChrominiumHelper } = require('../helpers/Chrominium.helper')

/**
 * Microsoft Edge object
 * @extends KitaBrowser
 */
class MicrosoftEdgeBrowser extends KitaBrowser {
    /**
     * Constructs the object
     * @param {KitaSession} session Google Chrome debugging session information
     */
    constructor(session) {
        super(session)
    }

    /**
     * Initiate a new instance of Microsoft Edge
     * @param {KitaCapabilities} capabilities  Browser capabilities
     * @returns a {@link Promise}.
     * `resolve` to {@link MicrosoftEdgeBrowser} if instance can be started sucessfully.
     * `reject` with Errors
     */
    static new(capabilities) {
        let startUrl = capabilities.get(CapabilityDefinitions.SupportedCapabilities.START_URL)
        if (startUrl === undefined) {
          startUrl = 'about:blank'
        }

        return new Promise((resolve, reject) => {
            ChrominiumHelper.new(capabilities).then((session) => {
                const instance = new MicrosoftEdgeBrowser(session)
                instance.navigate(startUrl).then(() => {
                  resolve(instance)
                }, (err) => {
                  reject(err)
                })
            }, (err) => {
                reject(err)
            })
        })
    }

    /**
     * Attach {@link KitaSession} to `session`
     * @param {KitaSession} session 
     */
    attachToSession(session) {
        super.attachToSession(session)
    }

    /**
     * Get all available Microsoft Edge debugging sessions
     * @param {KitaCapabilities} capabilities Browser capabilities
     * @param {boolean} pagesOnly If `true` only page sessions will return
     * @returns a {@link Promise}.
     * `resolve` to {@link Map<string, KitaSession>} if sessions can be retrieved sucessfully.
     * `reject` with Errors
     */
    getSessions(capabilities, pagesOnly = true) {        
        return ChrominiumHelper.getSessions(capabilities, pagesOnly)
    }

    /**
     * Navigates to URL using `window.location`
     * @param {string} url URL to navigate 
     * @returns a {@link Promise}.
     * `resolve` to {@link MicrosoftEdgeBrowser}, if the navigation is completed.
     * `reject` with {@link ErrorTypes.NavigationFailed}, if the result URL is different from `url`
     */
    navigate(url) {
        return ChrominiumHelper.navigate(this, url)
    }
      
    /**
     * Eval scripts in {@link KitaSession} console window
     * @param {string} script script to be executed
     * @param {int} timeout timeout for script execution
     * @returns a {@link Promise}.
     * `resolve` to {@link Object} with of console result.
     * `reject` with {@link ErrorTypes.EvalFailed}
     */
    eval(script, timeout = 30 * 1000) {
        return ChrominiumHelper.eval(this, script, timeout)
    }
}

module.exports = {
    MicrosoftEdgeBrowser
}