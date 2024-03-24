import { KitaCapabilities } from './KitaCapabilities';
import { WebDriverHelper } from './helpers/WebDriver.helper';
import { MicrosoftEdgeBrowser } from './browser/MicrosoftEdge.browser';
import { GoogleChromeBrowser } from './browser/GoogleChrome.browser';

/**
 * KitaWebDriver instance that gives control over a browser session
 */
export class KitaWebDriver {
    protected browserInstance?: MicrosoftEdgeBrowser | GoogleChromeBrowser;
    public get BrowserInstance() {
        return this.browserInstance;
    }

    /**
     * Initiates web driver with basic capabilities for the `browser`
     * @param {string} browser Name of browser to get capabilities
     * @returns {KitaWebDriver} WebDriver instance
     */
    static new(browser: string) {
        const webDriver = new KitaWebDriver();
        const capabilities = KitaCapabilities.for(browser);
        return webDriver.start(capabilities);
    }

    /**
     * Start the browser process
     * @returns a {@link Promise}.
     * `resolve` to {@link KitaWebDriver} if session can be attached and start page navigated sucessfully.
     * `reject` with Errors
     */
    start(capabilities: KitaCapabilities): Promise<KitaWebDriver> {  
        return new Promise((resolve, reject) => {
            (async () => {
                const instance = await WebDriverHelper.newKitaBrowserInstance(capabilities);
                this.browserInstance = instance;
                resolve(this);
            })().catch((err) => {
                reject(err);
            });
        });
    }
}