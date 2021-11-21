'use strict'

const { KitaError } = require('./KitaError.type')

/**
 * Error type @extends KitaError
 */
class EvalFailed extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error, append = `failed to execute`) {
        super(error, append)
    }
}

module.exports = {
    EvalFailed
}