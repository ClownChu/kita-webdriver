import { KitaError } from './KitaError.type';

/**
 * Error type @extends KitaError
 */
export class FailedToCaptureScreenshot extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error: string | unknown, append = `failed to capture screenshot`) {
        super(error, append);
    }
}