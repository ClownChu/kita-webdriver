'use strict'

const { KitaError } = require('./KitaError.type')

/**
 * Error type @extends KitaError
 */
class InvalidBrowser extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error, append = `is not a valid browser`) {
        super(error, append)
    }
}

module.exports = {
    InvalidBrowser
}