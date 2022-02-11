import { CapabilitiesCollection, CapabilitiesValue } from 'types';
import { BrowserAlias } from './definitions/browser/BrowserAlias.definition';
import { BrowserDisplayName } from './definitions/browser/BrowserDisplayName.definition';
import { SupportedBrowsers } from './definitions/kita/SupportedBrowsers.definition';
import { SupportedCapabilities } from './definitions/capability/SupportedCapabilities.defintion';
import { InvalidBrowser } from './types/error/InvalidBrowser.type';

/**
 * Has all capabilities for the browser instance
 */
export class KitaCapabilities {
    protected capabilities: CapabilitiesCollection;
    public get Capabilities() {
        return this.capabilities;
    }

    /**
     * Construct object of type {@link KitaCapabilities}
     * @param {KitaCapabilities} preConfiguration 
     */
    constructor(preConfiguration?: KitaCapabilities) {
        if (preConfiguration instanceof KitaCapabilities) {
            this.capabilities = preConfiguration.Capabilities;
        } else {
            this.capabilities = new Map(preConfiguration);
        }
    }

    /**
     * Set capability to capabilities {@link Map}
     * @param {string} capability 
     * @param {any} value 
     */
    set(capability: string, value: CapabilitiesValue = null) {
        this.Capabilities.set(capability, value);
    }

    /**
     * Get capability in capabilities {@link Map}
     * @param {string} capability 
     * @return {Object} Capability value
     */
    get(capability: string) {
        return this.Capabilities.get(capability);
    }

    /**
     * Remove capability in capabilityes {@link Map}
     * @param {string} capability 
     * @returns {bool} true if removed successfully
     */
    remove(capability: string) {
        return this.Capabilities.delete(capability);
    }

    /**
     * Build the browser instance debugging API Url based on capabilities
     * @returns {string} Debugging API Url based on capabilities
     */
    buildDebuggingUrl() {
        const remoteDebuggingProtocol = this.get(SupportedCapabilities.REMOTE_DEBUGGING_PROTOCOL);
        const remoteDebuggingHostname = this.get(SupportedCapabilities.REMOTE_DEBUGGING_HOSTNAME);
        const remoteDebuggingPort = this.get(SupportedCapabilities.REMOTE_DEBUGGING_PORT);

        return `${remoteDebuggingProtocol}://${remoteDebuggingHostname}:${remoteDebuggingPort}`;
    }

    /**
     * @static Get basic necessary capabilities for `browser`
     * @param {string} browser Name of browser to get capabilities
     * @return {KitaCapabilities} Basic capabilities to launch Browser
     */
    static for(browser: string) {
        const capabilities = new KitaCapabilities();

        const kitaBrowser = Object.keys(BrowserAlias).find((key) => {
            return BrowserAlias[key].includes(browser);
        });

        if (kitaBrowser === undefined || SupportedBrowsers[kitaBrowser] === undefined) {
            throw new InvalidBrowser(browser);
        }
        
        const browserDisplayName = BrowserDisplayName[kitaBrowser];

        capabilities.set(SupportedCapabilities.KITA_BROWSER, kitaBrowser);
        capabilities.set(SupportedCapabilities.BROWSER_PROCESS_NAME, SupportedBrowsers[kitaBrowser]);
        capabilities.set(SupportedCapabilities.BROWSER_DISPLAY_NAME, browserDisplayName);
        capabilities.set(SupportedCapabilities.REMOTE_DEBUGGING_PROTOCOL, `http`);
        capabilities.set(SupportedCapabilities.REMOTE_DEBUGGING_HOSTNAME, `127.0.0.1`);
        capabilities.set(SupportedCapabilities.REMOTE_DEBUGGING_PORT, 9222);

        return capabilities;
    }
}