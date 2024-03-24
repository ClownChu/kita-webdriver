import { KitaWebDriver } from './..';

(async () => {
    const webdriver = await KitaWebDriver.new(`edge`);
    const browserInstance = webdriver.BrowserInstance;
    await browserInstance?.navigate(`https://www.google.com`);
    await browserInstance?.close();
})().catch(err => {
    console.log(JSON.stringify(err));
});