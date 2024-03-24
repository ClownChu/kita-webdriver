import { KitaWebDriver } from './..';

(async () => {
    const webdriver = await KitaWebDriver.new(`edge`);
    const browserInstance = webdriver.BrowserInstance;
    await browserInstance?.close();
    console.log(`closed`);
})().catch(err => {
    console.log(JSON.stringify(err));
});
