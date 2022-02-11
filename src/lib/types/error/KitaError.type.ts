/**
 * Error type @extends Error
 */
export abstract class KitaError extends Error {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor (error: string | object, append = ``) {
        if (typeof error === `object`) {
            error = JSON.stringify(error);
        }
        
        super(`${error} ${append}`);
    }
}