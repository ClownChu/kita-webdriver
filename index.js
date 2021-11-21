'use strict'

const { KitaWebDriver } = require('./lib/KitaWebDriver')
const { KitaCapabilities } = require('./lib/KitaCapabilities')
const { KitaSession } = require('./lib/KitaSession')

const { KitaDefinitions, BrowserDefinitions, CapabilityDefinitions } = require('./lib/definitions')

module.exports = {
    Kita: {
        WebDriver: KitaWebDriver
    },
    Configuration: {
        Capabilities: KitaCapabilities,
        Session: KitaSession
    },
    Definitions: {
        Kita: KitaDefinitions,
        Browser: BrowserDefinitions,
        Capability: CapabilityDefinitions
    }
}