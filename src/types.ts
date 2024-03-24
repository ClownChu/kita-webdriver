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