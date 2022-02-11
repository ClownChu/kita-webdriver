import { KitaSession } from './KitaSession';

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

    /**
     * Construct object of type {@link KitaBrowser}
     * @param {KitaSession} session 
     */
    constructor(session: KitaSession) {
        this.Session = session;
    }
}