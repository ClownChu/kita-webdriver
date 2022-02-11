import { KitaError } from './KitaError.type';

/**
 * Error type @extends KitaError
 */
export class InvalidCapability extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error: string, append = `is not a valid capability`) {
        super(error, append);
    }
}