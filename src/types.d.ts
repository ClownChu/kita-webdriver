import { KitaSession } from "./lib/KitaSession";

export type CapabilitiesValue = null | string | number | boolean;
export declare type CapabilitiesCollection = Map<string, CapabilitiesValue>;

export declare type KitaSessionsCollection = Map<string, KitaSession>;

export type ChrominiumSessionInformation = {
    description: string,
    devtoolsFrontendUrl: string,
    id: string,
    parentId: string,
    title: string,
    type: string,
    url: string,
    webSocketDebuggerUrl: string
};
export type GoogleChromeSessionInformation = ChrominiumSessionInformation;
export type MicrosoftEdgeSessionInformation = ChrominiumSessionInformation;

export declare type KitaSessionInformation = ChrominiumSessionInformation | GoogleChromeSessionInformation | MicrosoftEdgeSessionInformation;

export namespace DevTools {
    export type Payload = {          
        id: number,
        method: string,
        params?: PayloadParams
    };

    export type PayloadParams = 
            DevTools.Page.Navigate.Params 
        |   DevTools.Page.CaptureScreenshot.Params
        |   DevTools.Runtime.Evaluate.Params;

    export type WsResult = 
            DevTools.Page.Navigate.Result 
        |   DevTools.Page.CaptureScreenshot.Result
        |   DevTools.Runtime.Evaluate.Result;
    
    export type PayloadResult = {
        id: number,
        result: WsResult
    };
}

export namespace DevTools.Browser {
    export namespace Common {
        
    }
}

export namespace DevTools.Runtime {
    export namespace Common {
        export type ExecutionContextId = number;
        export type TimeDelta = number;
        export type RemoteObject = {
            type: string,
            subtype?: string,
            className?: string,
            value?: any,
            unserializableValue?: UnserializableValue,
            description?: string,
            objectId?: RemoteObjectId,
            preview?: ObjectPreview,
            customPreview?: ObjectPreview,
        };
        export type UnserializableValue = string;
        export type RemoteObjectId = string;
        export type ObjectPreview = {
            type: string,
            subtype?: string,
            description?: string,
            overflow?: boolean,
            properties?: PropertyPreview[],
            entries?: EntryPreview[],
        }
        export type PropertyPreview = {
            name: string,
            type: string,
            value?: string,
            valuePreview?: ObjectPreview,
            subtype: string
        }
        export type EntryPreview = {
            key?: ObjectPreview,
            value: ObjectPreview
        }
        export type CustomPreview = {
            header: ObjectPreview,
            bodyGetterId?: RemoteObjectId
        }
        export type ExceptionDetails = {
            exceptionId: number,
            text: string,
            lineNumber: number,
            columnNumber: number,
            scriptId?: ScriptId,
            url?: string,
            stackTrace: StackTrace,
            exception: RemoteObject,
            executionContextId: ExecutionContextId,
            exceptionMetaData: object,
        }
        export type ScriptId = string;
        export type StackTrace = {
            description?: string,
            callFrames: CallFrame[],
            parent?: StackTrace,
            parentId?: StackTraceId
        }
        export type CallFrame = {
            functionName: string,
            scriptId: ScriptId,
            url: string,
            lineNumber: number,
            columnNumber: number
        }
        export type StackTraceId = {
            id: string,
            debuggerId?: UniqueDebuggerId
        }
        export type UniqueDebuggerId = string;
    }

    export namespace Evaluate {
        export type Params = {
            expression: string,
            objectGroup?: string,
            includeCommandLineAPI?: boolean,
            silent?: boolean,
            contextId?: Common.ExecutionContextId,
            returnByValue?: boolean,
            generatePreview?: boolean,
            userGesture?: boolean,
            awaitPromise?: boolean,
            throwOnSideEffect?: boolean,
            timeout?: Common.TimeDelta,
            disableBreaks?: boolean,
            replMode?: boolean,
            allowUnsafeEvalBlockedByCSP?: boolean,
            uniqueContextId?: string,
        }
        export type Result = {
            result: Common.RemoteObject,
            exceptionDetails?: Common.ExceptionDetails,
        }
    }
}

export namespace DevTools.Page {
    export namespace Common {
        export type TransitionType = string;
        export type FrameId = string;
        export type ReferrerPolicy = string;
        export type Viewport = {
            x: number,
            y: number,
            width: number,
            height: number,
            scale: number
        }
    }
    
    export namespace Network {
        export type LoaderId = string;
    }

    export namespace Navigate {
        export type Params = {
            url: string,
            referrer?: string,
            transitionType?: Common.TransitionType,
            frameId?: Common.FrameId,
            referrerPolicy?: ReferrerPolicy
        }
        export type Result = {
            frameId: Common.FrameId,
            loaderId?: Network.LoaderId,
            errorText?: string
        }
    }

    export namespace CaptureScreenshot {
        export type Params = {
            format?: string,
            quality?: number,
            clip?: Common.Viewport,
            fromSurface?: boolean,
            captureBeyondViewport?: boolean
        }
        export type Result = {
            data: string
        }
    }
}