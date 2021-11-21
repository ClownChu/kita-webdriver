'use strict'

const { KitaError } = require('./KitaError.type')
const { NotSupportedYet } = require('./NotSupportedYet.type')
const { InvalidBrowser } = require('./InvalidBrowser.type')
const { InvalidCapability } = require('./InvalidCapability.type')
const { NavigationFailed } = require('./NavigationFailed.type')
const { EvalFailed } = require('./EvalFailed.type')
const { InvalidKitaSession } = require('./InvalidKitaSession.type')
const { WebSocketMessageFailed } = require('./WebSocketMessageFailed.type')

module.exports = {
    KitaError,
    NotSupportedYet,
    InvalidBrowser,
    InvalidCapability,
    NavigationFailed,
    EvalFailed,
    InvalidKitaSession,
    WebSocketMessageFailed
}

