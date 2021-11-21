'use strict'

/**
 * Error type @extends Error
 */
class KitaError extends Error {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor (error, append = '') {
        if (typeof error === 'object') {
            error = JSON.stringify(error)
        }
        
        super(`${error} ${append}`)
    }
}

module.exports = {
    KitaError
}