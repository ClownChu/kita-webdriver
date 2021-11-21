'use strict'

const { KitaError } = require('./KitaError.type')

/**
 * Error type @extends KitaError
 */
class NavigationFailed extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error, append = `could not be reached`) {
        super(error, append)
    }
}

module.exports = {
    NavigationFailed
}