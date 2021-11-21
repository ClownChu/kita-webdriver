'use strict'

const { KitaDefinitions, BrowserDefinitions, CapabilityDefinitions } = require('./definitions')

const { ErrorTypes } = require('./types')
const { ObjectHelper } = require('./helpers/Object.helper')

/**
 * Has all capabilities for the browser instance
 */
class KitaCapabilities {
    /**
     * Construct object of type {@link KitaCapabilities}
     * @param {KitaCapabilities} preConfiguration 
     */
    constructor(preConfiguration = undefined) {
        if (preConfiguration instanceof KitaCapabilities) {
            preConfiguration = preConfiguration.capabilities
        }

        this.capabilities = new Map(preConfiguration)
    }

    /**
     * Set capability to capabilities {@link Map}
     * @param {string} capability 
     * @param {any} value 
     */
    set(capability, value = null) {
        if (typeof capability !== 'string') {
            /** TODO : Create KitaError type for invalid types */
            throw new ErrorTypes.InvalidCapability(`capability`, `must be string, found: ${typeof key}`)
        }

        const isValid = ObjectHelper.includes(capability, CapabilityDefinitions.SupportedCapabilities)
        if (!isValid) {
            throw new ErrorTypes.InvalidCapability(capability)
        }

        this.capabilities.set(capability, value)
    }

    /**
     * Get capability in capabilities {@link Map}
     * @param {string} capability 
     * @return {Object} Capability value
     */
    get(capability) {
        if (typeof capability !== 'string') {
            /** TODO : Create KitaError type for invalid types */
            throw new ErrorTypes.InvalidCapability(`capability`, `must be string, found: ${typeof key}`)
        }

        return this.capabilities.get(capability)
    }

    /**
     * Remove capability in capabilityes {@link Map}
     * @param {string} capability 
     * @returns {bool} true if removed successfully
     */
    remove(capability) {
        if (typeof capability !== 'string') {
            /** TODO : Create KitaError type for invalid types */
            throw new ErrorTypes.InvalidCapability(`capability`, `must be string, found: ${typeof key}`)
        }

        return this.capabilities.delete(capability)
    }

    /**
     * Build the browser instance debugging API Url based on capabilities
     * @returns {string} Debugging API Url based on capabilities
     */
    buildDebuggingUrl() {
        const remoteDebuggingProtocol = this.get(CapabilityDefinitions.SupportedCapabilities.REMOTE_DEBUGGING_PROTOCOL)
        const remoteDebuggingHostname = this.get(CapabilityDefinitions.SupportedCapabilities.REMOTE_DEBUGGING_HOSTNAME)
        const remoteDebuggingPort = this.get(CapabilityDefinitions.SupportedCapabilities.REMOTE_DEBUGGING_PORT)

        return `${remoteDebuggingProtocol}://${remoteDebuggingHostname}:${remoteDebuggingPort}`
    }

    /**
     * @static Get basic necessary capabilities for `browser`
     * @param {string} browser Name of browser to get capabilities
     * @return {KitaCapabilities} Basic capabilities to launch Browser
     */
    static for(browser) {
        const capabilities = new KitaCapabilities()

        const kitaBrowser = ObjectHelper.findKey(browser, BrowserDefinitions.BrowserAlias)
        if (kitaBrowser === null) {
            throw new ErrorTypes.InvalidBrowser(browser)
        }
        
        const browserDisplayName = BrowserDefinitions.BrowserDisplayName[kitaBrowser]

        const isBrowserSupported = ObjectHelper.includesKey(kitaBrowser, KitaDefinitions.SupportedBrowsers)
        if (!isBrowserSupported) {
            throw new ErrorTypes.NotSupportedYet(browserDisplayName)
        }

        capabilities.set(CapabilityDefinitions.SupportedCapabilities.KITA_BROWSER, kitaBrowser)
        capabilities.set(CapabilityDefinitions.SupportedCapabilities.BROWSER_PROCESS_NAME, BrowserDefinitions.SupportedBrowsers[kitaBrowser])
        capabilities.set(CapabilityDefinitions.SupportedCapabilities.BROWSER_DISPLAY_NAME, browserDisplayName)
        capabilities.set(CapabilityDefinitions.SupportedCapabilities.REMOTE_DEBUGGING_PROTOCOL, 'http')
        capabilities.set(CapabilityDefinitions.SupportedCapabilities.REMOTE_DEBUGGING_HOSTNAME, '127.0.0.1')
        capabilities.set(CapabilityDefinitions.SupportedCapabilities.REMOTE_DEBUGGING_PORT, '9222')

        return capabilities
    }
}

module.exports = {
    KitaCapabilities
}