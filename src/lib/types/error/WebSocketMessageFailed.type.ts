import { KitaError } from './KitaError.type';

/**
 * Error type @extends KitaError
 */
export class WebSocketMessageFailed extends KitaError {
    /**
     * Construct Error object
     * @param {string} error Error message
     * @param {string} append String appended to `error`
     */
    constructor(error: string, append = `failed to send to WebSocket`) {
        super(error, append);
    }
}