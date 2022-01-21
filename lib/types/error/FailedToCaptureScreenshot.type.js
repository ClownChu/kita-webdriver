'use strict'

const { KitaError } = require('./KitaError.type')

/**
 * Error type @extends KitaError
 */
class FailedToCaptureScreenshot extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error, append = `failed to capture screenshot`) {
        super(error, append)
    }
}

module.exports = {
    FailedToCaptureScreenshot
}