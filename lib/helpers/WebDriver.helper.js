'use strict'

const { GoogleChromeBrowser } = require('../browser/GoogleChrome.browser')
const { MicrosoftEdgeBrowser } = require('../browser/MicrosoftEdge.browser')
const { CapabilityDefinitions } = require('../definitions')
const { ErrorTypes } = require('../types')

/**
 * Provides with methods to assist with operations in Chrominium based browsers
 */
class WebDriverHelper {
    /**
     * @static Initiate a new instance of a browser based on capabilities
     * @param {KitaCapabilities} capabilities Browser capabilities
     * @returns a {@link Promise}.
     * `resolve` to {@link KitaBrowser} if instance can be started sucessfully.
     * `reject` with Errors
     */
    static newKitaBrowserInstance(capabilities) {
        const kitaBrowser = capabilities.get(CapabilityDefinitions.SupportedCapabilities.KITA_BROWSER)
        switch (kitaBrowser) {
            case "CHROME":
                return GoogleChromeBrowser.new(capabilities)
            case "EDGE":
                return MicrosoftEdgeBrowser.new(capabilities)
            default:
                throw new ErrorTypes.NotSupportedYet(kitaBrowser)
        }
    }
}

module.exports = {
    WebDriverHelper
}