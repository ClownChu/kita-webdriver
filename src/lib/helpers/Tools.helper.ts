/**
 * Provides with methods to assist with operations that involves the System
 */
export class ToolsHelper {
    /**
     * @static returns random ID
     * @param {int} length length of id to be returned
     * @param {boolean} include_numbers true to include numbers in the id (default: false)
     * @returns a {@link string}.
     */
    static makeid(length: number, include_numbers = false) {
        let characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`;
        if (include_numbers) {
            characters += `0123456789`;
        }

        const charactersLength = characters.length;

        let result = ``;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

        return result;
    }
}