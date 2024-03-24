import { KitaError } from './KitaError.type';

/**
 * Error type @extends KitaError
 */
export class InvalidBrowser extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error: string | unknown, append = `is not a valid browser`) {
        super(error, append);
    }
}