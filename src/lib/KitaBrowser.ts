import { KitaSession } from './KitaSession';
import CDP from 'chrome-remote-interface';

/**
 * Browser instance attached to {@link KitaWebDriver}
 */
export abstract class KitaBrowser {
    protected session?: KitaSession;
    public get Session() {
        return this.session as KitaSession;
    }
    public set Session(session: KitaSession) {
        this.session = session;
    }

    protected cdpClient?: CDP.Client;
    public get CdpClient() {
        return this.cdpClient as CDP.Client;
    }
    public set CdpClient(cdpClient: CDP.Client) {
        this.cdpClient = cdpClient;
    }

    protected isCdpConnected?: boolean;
    public get IsCdpConnected() {
        return this.isCdpConnected;
    }

    /**
     * Construct object of type {@link KitaBrowser}
     * @param {KitaSession} session 
     */
    constructor(session: KitaSession) {
        this.Session = session;
    }

    async connect(maxRetries = 5, connectionTimeout = 100) {
        const self = this;
        let connectionAttempt = 0;

        const tryConnect = async () => {
            try {
                const webSocketDebugger = self.Session.Information.webSocketDebuggerUrl.split('/').at(2)?.split(':');
                self.CdpClient = await CDP({
                    host: webSocketDebugger?.at(0),
                    port: webSocketDebugger?.at(1)
                } as CDP.Options);

                console.log('Connected to Chrome DevTools Protocol');

                self.CdpClient.on('disconnect', () => {
                    console.log('Chrome DevTools Protocol disconnected');
                    self.isCdpConnected = false;
                });
            } catch (error) {
                connectionAttempt += 1;
                if (connectionAttempt === maxRetries) {
                    throw new Error(
                        `Failed to connect to Chrome DevTools Protocol after ${connectionTimeout * connectionAttempt
                        }`
                    );
                }

                if (connectionAttempt < maxRetries) {
                    console.log(
                        'Failed to connect to Chrome DevTools Protocol, attempt: %d',
                        connectionAttempt
                    );

                    console.log('Reconnecting...');

                    // eslint-disable-next-line no-promise-executor-return
                    await new Promise((resolve) => setTimeout(resolve, connectionTimeout));
                    await tryConnect();
                }
            }
        };

        await tryConnect();
    }
}