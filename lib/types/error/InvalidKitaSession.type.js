'use strict'

const { KitaError } = require('./KitaError.type')

/**
 * Error type @extends KitaError
 */
class InvalidKitaSession extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error, append = `is not a valid object of type KitaSession`) {
        super(error, append)
    }
}

module.exports = {
    InvalidKitaSession
}