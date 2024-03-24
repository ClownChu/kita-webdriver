import { KitaError } from './KitaError.type';

/**
 * Error type @extends KitaError
 */
export class NavigationFailed extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error: string | unknown, append = `could not be reached`) {
        super(error, append);
    }
}