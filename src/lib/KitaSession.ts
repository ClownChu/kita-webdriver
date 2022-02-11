import { KitaSessionInformation } from "types";

export class KitaSession {
    protected information: KitaSessionInformation;
    public get Information() {
        return this.information;
    }

    constructor(information: KitaSessionInformation) {
        this.information = information;
    }
}
