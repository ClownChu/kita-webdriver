import { NotSupportedYet } from '../types/error/NotSupportedYet.type';
import { WebSocketMessageFailed } from '../types/error/WebSocketMessageFailed.type';
import { WebSocket } from 'ws';

/**
 * Provides methods to help with operations that involves {@link WebSocket}
 */
export class WebSocketHelper {
    /**
     * @static Open, send message, get response, then close WebSocket connection
     * @param {string} wsUrl URL for socket connection
     * @param {object} message message to send to socket
     * @param {string} responseType type of response expected from the socket
     * @returns a {Promise}.
     * `resolve` to {@link Object} with of socket response.
     * `reject` with [{@link ErrorTypes.WebSocketMessageFailed} | {@link ErrorTypes.NotSupportedYet}]
     */
    static sendMessage<T>(wsUrl: string, message: object, responseType = `raw`): Promise<T> {
        return new Promise((resolve, reject) => {
            try {
                /**
                 * TODO : Fix this mess
                 */
                const ws = new WebSocket(wsUrl);
                ws.once(`open`, () => {
                    ws.on(`message`, (data) => {
                        ws.once(`close`, () => {
                            let response = null;
                            switch (responseType) {
                                case `raw`:
                                case `buffer`:
                                    response = data;
                                    break;
                                case `json`:
                                    response = JSON.parse(data.toString());
                                    break;
                                case `string`:
                                    response = data.toString();
                                    break;
                                default:
                                    reject(new NotSupportedYet(responseType));
                                    break;
                            }

                            resolve(response);
                        });
                
                        ws.close();
                    });
            
                    ws.send(JSON.stringify(message));
                });
            } catch (err) {
                reject(new WebSocketMessageFailed(`${wsUrl} - ${JSON.stringify(message)}`));
            }
        });
    }
}