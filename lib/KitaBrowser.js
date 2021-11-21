'use strict'

const { ErrorTypes } = require('./types')
const { KitaSession } = require('./KitaSession')

/**
 * Browser instance attached to {@link KitaWebDriver}
 */
class KitaBrowser {
    /**
     * Construct object of type {@link KitaBrowser}
     * @param {KitaSession} session 
     */
    constructor(session) {
        this.attachToSession(session)
    }

    /**
     * Attach {@link KitaSession} to `session`
     * @param {KitaSession} session 
     */
    attachToSession(session) {
        if (!(session instanceof KitaSession)) {
            throw new ErrorTypes.InvalidKitaSession(session)
        }

        this.session = session
    }
}

module.exports = {
    KitaBrowser
}