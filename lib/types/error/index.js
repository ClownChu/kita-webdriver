'use strict'

const { KitaError } = require('./KitaError.type')
const { NotSupportedYet } = require('./NotSupportedYet.type')
const { InvalidBrowser } = require('./InvalidBrowser.type')
const { InvalidCapability } = require('./InvalidCapability.type')
const { NavigationFailed } = require('./NavigationFailed.type')
const { EvalFailed } = require('./EvalFailed.type')
const { FailedToClose } = require('./FailedToClose.type')
const { FailedToCaptureScreenshot } = require('./FailedToCaptureScreenshot.type')
const { InvalidKitaSession } = require('./InvalidKitaSession.type')
const { WebSocketMessageFailed } = require('./WebSocketMessageFailed.type')

module.exports = {
    KitaError,
    NotSupportedYet,
    InvalidBrowser,
    InvalidCapability,
    NavigationFailed,
    EvalFailed,
    FailedToClose,
    FailedToCaptureScreenshot,
    InvalidKitaSession,
    WebSocketMessageFailed
}

