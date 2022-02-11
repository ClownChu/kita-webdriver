import { KitaError } from './KitaError.type';

/**
 * Error type @extends KitaError
 */
export class NotSupportedYet extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error: string, append = `is not supported yet`) {
        super(error, append);
    }
}