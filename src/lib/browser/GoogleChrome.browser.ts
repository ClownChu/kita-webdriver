import { KitaBrowser } from './../KitaBrowser';
import { ChrominiumHelper } from '../helpers/Chrominium.helper';
import { KitaSession } from '../KitaSession';
import { SupportedCapabilities } from '../definitions/capability/SupportedCapabilities.defintion';
import { KitaCapabilities } from '../KitaCapabilities';

/**
 * Google Chrome object
 * @extends KitaBrowser
 */
export class GoogleChromeBrowser extends KitaBrowser {
    /**
     * Constructs the object
     * @param {KitaSession} session Google Chrome debugging session information
     */
    constructor(session: KitaSession) {
        super(session);
    }

    /**
     * Initiate a new instance of Google Chrome
     * @param {KitaCapabilities} capabilities  Browser capabilities
     * @returns a {@link Promise}.
     * `resolve` to {@link GoogleChromeBrowser} if instance can be started sucessfully.
     * `reject` with Errors
     */
    static new(capabilities: KitaCapabilities): Promise<GoogleChromeBrowser> {
        let startUrl = capabilities.get(SupportedCapabilities.START_URL);
        if (startUrl === undefined) {
          startUrl = `about:blank`;
        }

        return new Promise((resolve, reject) => {
            ChrominiumHelper.new(capabilities).then((session) => {
                const instance = new GoogleChromeBrowser(session);
                instance.navigate(startUrl as string).then(() => {
                  resolve(instance);
                }, (err) => {
                  reject(err);
                });
            }, (err) => {
                reject(err);
            });
        });
    }

    /**
     * Get all available Google Chrome debugging sessions
     * @param {KitaCapabilities} capabilities Browser capabilities
     * @param {boolean} pagesOnly If `true` only page sessions will return
     * @returns a {@link Promise}.
     * `resolve` to {@link Map<string, KitaSession>} if sessions can be retrieved sucessfully.
     * `reject` with Errors
     */
    getSessions(capabilities: KitaCapabilities, pagesOnly = true) {        
        return ChrominiumHelper.getSessions(capabilities, pagesOnly);
    }

    /**
     * Navigates to URL using `window.location`
     * @param {string} url URL to navigate 
     * @returns a {@link Promise}.
     * `resolve` to {@link GoogleChromeBrowser}, if the navigation is completed.
     * `reject` with {@link ErrorTypes.NavigationFailed}, if the result URL is different from `url`
     */
    navigate(url: string): Promise<GoogleChromeBrowser> {
        return new Promise((resolve) => {
            ChrominiumHelper.navigate(this, url).then(() => {
                resolve(this);
            });
        });
    }
      
    /**
     * Eval scripts in {@link KitaSession} console window
     * @param {string} script script to be executed
     * @param {int} timeout timeout for script execution
     * @returns a {@link Promise}.
     * `resolve` to {@link Object} with of console result.
     * `reject` with {@link ErrorTypes.EvalFailed}
     */
    eval(script: string, timeout = 30 * 1000) {
        return ChrominiumHelper.eval(this, script, timeout);
    }
      
    /**
     * Close {@link KitaSession}
     * @returns a {@link Promise}.
     * `resolve` to {@link Object} with of console result.
     * `reject` with {@link ErrorTypes.FailedToClose}
     */
    close() {
        return ChrominiumHelper.close(this);
    }
      
    /**
     * Capture screenshot from the {@link KitaSession} instance
     * @returns a {@link Promise}.
     * `resolve` to base64 encoded {@link string} of screenshot.
     * `reject` with {@link ErrorTypes.FailedToCapture}
     */
    captureScreenshot(format = `jpeg`, quality = 100) {
        return ChrominiumHelper.captureScreenshot(this, format, quality);
    }
}