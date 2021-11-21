'use strict'

const WebSocket = require('ws')
const { ErrorTypes } = require('../types')

/**
 * Provides methods to help with operations that involves {@link WebSocket}
 */
class WebSocketHelper {
    /**
     * @static Open, send message, get response, then close WebSocket connection
     * @param {string} wsUrl URL for socket connection
     * @param {object} message message to send to socket
     * @param {string} responseType type of response expected from the socket
     * @returns a {Promise}.
     * `resolve` to {@link Object} with of socket response.
     * `reject` with [{@link ErrorTypes.WebSocketMessageFailed} | {@link ErrorTypes.NotSupportedYet}]
     */
    static sendMessage(wsUrl, message, responseType = 'raw') {
        return new Promise((resolve, reject) => {
            try {
                /**
                 * TODO : Fix this mess
                 */
                const ws = new WebSocket(wsUrl)
                ws.once('open', () => {
                    ws.on('message', (data) => {
                        ws.once('close', () => {
                            let response = null
                            switch (responseType) {
                                case "raw":
                                    response = data
                                    break
                                case "json":
                                    response = JSON.parse(data.toString())
                                    break
                                case "string":
                                    response = data.toString()
                                    break
                                case "buffer":
                                    response = data.buffer()
                                    break
                                default:
                                    reject(new ErrorTypes.NotSupportedYet(responseType))
                                    break
                            }

                            resolve(response)
                        })
                
                        ws.close()
                    })
            
                    ws.send(JSON.stringify(message))
                })
            } catch (err) {
                reject(new ErrorTypes.WebSocketMessageFailed(`${wsUrl} - ${JSON.stringify(message)}`))
            }
        })
    }
}

module.exports = {
    WebSocketHelper
}