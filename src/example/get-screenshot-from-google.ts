import { KitaWebDriver } from './..';

(async () => {
    const webdriver = await KitaWebDriver.new(`chrome`);
    const browserInstance = webdriver.BrowserInstance;
    await browserInstance?.navigate(`https://www.google.com`);
    const base64String = await browserInstance?.captureScreenshot();
    await browserInstance?.navigate(`data:image/jpeg;base64,${base64String}`);

    await new Promise((resolve) => {
        setTimeout(resolve, 5000);
    });
    await browserInstance?.close();
})().catch(err => {
    console.log(JSON.stringify(err));
});