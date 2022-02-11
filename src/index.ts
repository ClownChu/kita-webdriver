import { KitaWebDriver } from './lib/KitaWebDriver';
import { KitaCapabilities } from './lib/KitaCapabilities';
import { KitaSession } from './lib/KitaSession';
import { SupportedBrowsers } from './lib/definitions/kita/SupportedBrowsers.definition';
import { BrowserAlias } from './lib/definitions/browser/BrowserAlias.definition';
import { BrowserDisplayName } from './lib/definitions/browser/BrowserDisplayName.definition';
import { SupportedCapabilities } from './lib/definitions/capability/SupportedCapabilities.defintion';

export default {
    WebDriver: KitaWebDriver,
    Configuration: {
        Capabilities: KitaCapabilities,
        Session: KitaSession
    },
    Definitions: {
        Kita: {
            SupportedBrowsers: SupportedBrowsers
        },
        Browser: {
            BrowserAlias: BrowserAlias,
            BrowserDisplayName: BrowserDisplayName
        },
        Capability: {
            SupportedCapabilities: SupportedCapabilities
        }
    }
};