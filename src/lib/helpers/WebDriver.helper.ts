import { SupportedCapabilities } from '../definitions/capability/SupportedCapabilities.defintion';
import { KitaCapabilities } from '../KitaCapabilities';
import { NotSupportedYet } from '../types/error/NotSupportedYet.type';
import { GoogleChromeBrowser } from '../browser/GoogleChrome.browser';
import { MicrosoftEdgeBrowser } from '../browser/MicrosoftEdge.browser';

/**
 * Provides with methods to assist with operations in Chrominium based browsers
 */
export class WebDriverHelper {
    /**
     * @static Initiate a new instance of a browser based on capabilities
     * @param {KitaCapabilities} capabilities Browser capabilities
     * @returns a {@link Promise}.
     * `resolve` to {@link KitaBrowser} if instance can be started sucessfully.
     * `reject` with Errors
     */
    static newKitaBrowserInstance(capabilities: KitaCapabilities): Promise<GoogleChromeBrowser | MicrosoftEdgeBrowser> {
        const kitaBrowser = capabilities.get(SupportedCapabilities.KITA_BROWSER);
        switch (kitaBrowser) {
            case `CHROME`:
                return GoogleChromeBrowser.new(capabilities);
            case `EDGE`:
                return MicrosoftEdgeBrowser.new(capabilities);
            default:
                throw new NotSupportedYet(kitaBrowser as string);
        }
    }
}