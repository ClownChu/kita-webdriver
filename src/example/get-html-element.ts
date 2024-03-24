import { GoogleChromeBrowser } from 'lib/browser/GoogleChrome.browser';
import { SystemHelper } from '../lib/helpers/System.helper';
import { KitaWebDriver } from './..';

(async () => {
    const webdriver = await KitaWebDriver.new(`chrome`);
    const browserInstance = webdriver.BrowserInstance as GoogleChromeBrowser;
    await browserInstance.navigate(`https://www.google.com`);
    await SystemHelper.sleep(1000);
    const response = await browserInstance?.eval(`return document.querySelector('body')`);
    
    if (response === undefined) {
        throw new Error(`Failed to get element inner text`);
    }
    else if (response.exceptionDetails !== undefined) {
        throw new Error(JSON.stringify(response.exceptionDetails));
    } else {
        console.log(response.result.value);
    }
    await browserInstance?.close();
})().catch(err => {
    console.log(JSON.stringify(err));
});