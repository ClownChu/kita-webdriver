import { exec } from 'child_process';
import axios from 'axios';

import { KitaSession } from '../KitaSession';
import { SystemHelper } from '../helpers/System.helper';
import { KitaCapabilities } from '../KitaCapabilities';
import { KitaBrowser } from '../KitaBrowser';
import { SupportedCapabilities } from '../definitions/capability/SupportedCapabilities.defintion';
import { SupportedBrowsers } from '../definitions/kita/SupportedBrowsers.definition';
import { NavigationFailed } from '../types/error/NavigationFailed.type';
import { KitaSessionsCollection } from '../../types';
import Protocol from 'devtools-protocol';
import { ToolsHelper } from './Tools.helper';


/**
 * Provides with methods to assist with operations in Chrominium based browsers
 */
export class ChrominiumHelper {
    /**
     * @static Initiate a new instance of a Chrominium based browser
     * @param {KitaCapabilities} capabilities Chrominium based browser capabilities
     * @returns a {@link Promise}.
     * `resolve` to {@link KitaSession} if instance can be started sucessfully.
     * `reject` with Errors
     */
    static new(capabilities: KitaCapabilities): Promise<KitaSession> {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const launchOptions = ChrominiumHelper.getLaunchOptions(capabilities);
                    const execResult = await exec(launchOptions.join(` `));
                    if (execResult.exitCode !== null && execResult.exitCode !== 0) {
                        reject(execResult);
                    }
                    /** TODO : Instead of sleep, verify that debugger has become available */
                    await SystemHelper.sleep(1000);
                    const sessions = await ChrominiumHelper.getSessions(capabilities);
                    resolve(sessions.values().next().value);
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }

    /**
     * @static Get Chrominium based browser launch options based on {@link KitaCapabilities}
     * @param {KitaCapabilities} capabilities Chrominium based browser capabilities
     * @returns {string[]} Options to launch the browser based on desired capabilities
     */
    static getLaunchOptions(capabilities: KitaCapabilities): string[] {
        const browserProcessName = capabilities.get(SupportedCapabilities.BROWSER_PROCESS_NAME) as string;
        const remoteDebuggingPort = capabilities.get(SupportedCapabilities.REMOTE_DEBUGGING_PORT) as number;

        const launchOptions = [
            `start`,
            browserProcessName,
            `data:,`,
            `--remote-debugging-port=${remoteDebuggingPort}`
        ];

        const appUrl = capabilities.get(SupportedCapabilities.APP_URL) as string;
        /** TODO : Validation helper */
        if (appUrl !== undefined && appUrl.length > 0) {
            launchOptions.push(`--app=${appUrl}`);
        }

        let privateMode = capabilities.get(SupportedCapabilities.PRIVATE_MODE) as boolean;
        const headlessMode = capabilities.get(SupportedCapabilities.HEADLESS_MODE) as boolean;

        /** TODO : Validation helper */
        if (headlessMode !== undefined && headlessMode) {
            launchOptions.push(`--headless`);
            privateMode = false;
        }

        /** TODO : Validation helper */
        if (privateMode !== undefined && privateMode) {
            if (browserProcessName === SupportedBrowsers.EDGE) {
                launchOptions.push(`--inprivate`);
            } else {
                launchOptions.push(`--incognito`);
            }
        } else {
            const userDataDir = capabilities.get(SupportedCapabilities.USER_DATA_DIR) as string;
            if (userDataDir !== undefined) {
                launchOptions.push(`--user-data-dir=${userDataDir}`);
            }
        }

        const windowPosition = capabilities.get(SupportedCapabilities.WINDOW_POSITION) as string;
        if (windowPosition !== undefined && /\d+,\d+/.test(windowPosition)) {
            launchOptions.push(`--window-position=${windowPosition}`);
        }

        const windowSize = capabilities.get(SupportedCapabilities.WINDOW_SIZE) as string;
        if (windowSize !== undefined && /\d+,\d+/.test(windowSize)) {
            launchOptions.push(`--window-size=${windowSize}`);
        }

        const allowFileAccessFromFiles = capabilities.get(SupportedCapabilities.ALLOW_FILE_ACCESS_FROM_FILES) as boolean;
        if (allowFileAccessFromFiles !== undefined && allowFileAccessFromFiles) {
            launchOptions.push(`--allow-file-access-from-files`);
        }

        const useFakeDeviceForMediaStream = capabilities.get(SupportedCapabilities.USE_FAKE_DEVICE_FOR_MEDIA_STREAM) as boolean;
        if (useFakeDeviceForMediaStream !== undefined && useFakeDeviceForMediaStream) {
            launchOptions.push(`--use-fake-device-for-media-stream`);

        }

        const useFakeUIForMediaStream = capabilities.get(SupportedCapabilities.USE_FAKE_UI_FOR_MEDIA_STREAM) as boolean;
        if (useFakeUIForMediaStream !== undefined && useFakeUIForMediaStream) {
            launchOptions.push(`--use-fake-ui-for-media-stream`);
        }

        const disableGPU = capabilities.get(SupportedCapabilities.DISABLE_GPU) as boolean;
        if (disableGPU !== undefined && disableGPU) {
            launchOptions.push(`--disable-gpu`);
        }

        const disableInfobars = capabilities.get(SupportedCapabilities.DISABLE_INFOBARS) as boolean;
        if (disableInfobars !== undefined && disableInfobars) {
            launchOptions.push(`--disable-infobars`);
        }

        return launchOptions;
    }

    /**
     * @static Get all available debugging sessions for Chrominium based browsers
     * @param {KitaCapabilities} capabilities Chrominium based browser capabilities
     * @param {boolean} pagesOnly If `true` only page sessions will return
     * @returns a {@link Promise}.
     * `resolve` to {@link Map<string, KitaSession>} if sessions can be retrieved sucessfully.
     * `reject` with Errors
     */
    static getSessions(capabilities: KitaCapabilities, pagesOnly = true): Promise<KitaSessionsCollection> {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const debuggingUrl = capabilities.buildDebuggingUrl();
                    const sessions: KitaSessionsCollection = new Map<string, KitaSession>();
                    const response = await axios.get(`${debuggingUrl}/json`);
                    for (let s = 0; response.data.length > s; s++) {
                        const session = response.data[s];
                        if (session.devtoolsFrontendUrl !== null) {
                            if (pagesOnly && session.type === `page`) {
                                sessions.set(session.id.toString(), new KitaSession(session));
                            } else if (!pagesOnly) {
                                sessions.set(session.id.toString(), new KitaSession(session));
                            }
                        }
                    }
                    resolve(sessions);
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }

    /**
     * @static Navigates to URL using `window.location`
     * @param {KitaBrowser} instance Chrominium based browser instance
     * @param {string} url URL to navigate 
     * @returns a {@link Promise}.
     * `resolve` to {@link KitaBrowser}, if the navigation is completed.
     * `reject` with {@link ErrorTypes.NavigationFailed}, if the result URL is different from `url`
     */
    static navigate(instance: KitaBrowser, url: string): Promise<KitaBrowser> {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const result = await instance.CdpClient.Page.navigate({ url: url });
                    if (result.frameId !== undefined) {
                        resolve(instance);
                    }

                    reject(new NavigationFailed(url));
                } catch (err) {
                    reject(new NavigationFailed(url, err as string));
                }
            })();
        });
    }

    /**
     * @static Eval scripts in {@link KitaSession} console window
     * @param {KitaBrowser} instance Chrominium based browser instance
     * @param {string} script script to be executed
     * @param {int} timeout timeout for script execution
     * @returns a {@link Promise}.
     * `resolve` to {@link Object} with of console result.
     * `reject` with {@link ErrorTypes.EvalFailed}
     */
    static eval(instance: KitaBrowser, script: string, timeout = 30 * 1000): Promise<Protocol.Runtime.EvaluateResponse> {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const evalId = ToolsHelper.makeid(10);
                    const expression = `
                        window.${evalId} = () => {   
                            setTimeout(() => {
                                delete window.${evalId}
                            }, 0)
            
                            ${script}
                        }
                        window.${evalId}()
                    `;

                    const result = await instance.CdpClient.Runtime.evaluate({
                        expression: expression,
                        objectGroup: evalId,
                        includeCommandLineAPI: true,
                        silent: false,
                        returnByValue: true,
                        userGesture: true,
                        awaitPromise: true,
                        timeout: timeout,
                        disableBreaks: true,
                        allowUnsafeEvalBlockedByCSP: true
                    });

                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }

    /**
     * @static Close {@link KitaSession}
     * @param {KitaBrowser} instance Chrominium based browser instance
     * @returns a {@link Promise}.
     * `resolve` to {@link Object} with of console result.
     * `reject` with {@link ErrorTypes.FailedToClose}
     */
    static close(instance: KitaBrowser): Promise<void> {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    await instance.CdpClient.close();
                    resolve();
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }

    /**
     * Capture screenshot from the {@link KitaSession} instance
     * @returns a {@link Promise}.
     * `resolve` to base64 encoded {@link string} of screenshot.
     * `reject` with {@link ErrorTypes.FailedToCapture}
     */
    static captureScreenshot(instance: KitaBrowser, format: "jpeg" | "png" | "webp" | undefined = `jpeg`, quality = 100): Promise<string> {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const result = await instance.CdpClient.Page.captureScreenshot({ format: format, quality: quality });
                    resolve(result.data);
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }

    static enableNetwork(instance: KitaBrowser): Promise<void> {
        return new Promise((resolve, reject) => {
            (async () => {
                try {
                    const result = await instance.CdpClient.Network.enable();
                    resolve(result);
                } catch (err) {
                    reject(err);
                }
            })();
        });
    }
}