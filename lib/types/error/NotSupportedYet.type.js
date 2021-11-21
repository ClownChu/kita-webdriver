'use strict'

const { KitaError } = require('./KitaError.type')

/**
 * Error type @extends KitaError
 */
class NotSupportedYet extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error, append = `is not supported yet`) {
        super(error, append)
    }
}

module.exports = {
    NotSupportedYet
}