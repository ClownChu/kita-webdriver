/**
 * Provides with methods to assist with operations that involves the System
 */
export class SystemHelper {
    /**
     * @static Do nothing for set period of time
     * @param {int} ms Time to sleep in milliseconds
     * @returns a {@link Promise}.
     * `resolve` to `void` after set interval.
     */
    static sleep(ms: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}