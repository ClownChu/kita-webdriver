'use strict'

const { ErrorTypes } = require('./types')
const { KitaCapabilities } = require('./KitaCapabilities')
const { WebDriverHelper } = require('./helpers/WebDriver.helper')

/**
 * KitaWebDriver instance that gives control over a browser session
 */
class KitaWebDriver {
    /**
     * Construct object of type {@link KitaWebDriver}
     * @param {KitaCapabilities} capabilities 
     */
    constructor(capabilities) {
        if (!(capabilities instanceof KitaCapabilities)) {
            throw new ErrorTypes.InvalidCapability(capabilities)
        }

        this.browserInstance = null
        /** TODO : Check for missing basic capabilities */
        this.capabilities = capabilities
    }

    /**
     * Initiates web driver with basic capabilities for the `browser`
     * @param {string} browser Name of browser to get capabilities
     * @returns {KitaWebDriver} WebDriver instance
     */
    static new(browser) {
        return new KitaWebDriver(KitaCapabilities.for(browser))
    }

    /**
     * Start the browser process
     * @returns a {@link Promise}.
     * `resolve` to {@link KitaWebDriver} if session can be attached and start page navigated sucessfully.
     * `reject` with Errors
     */
    start() {    
        return new Promise((resolve, reject) => {
            WebDriverHelper.newKitaBrowserInstance(this.capabilities).then((instance) => {
                this.browserInstance = instance
                resolve(this)
            }, (err) => {
                reject(err)
            })
        })
    }
}


module.exports = {
    KitaWebDriver
}