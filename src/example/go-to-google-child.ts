import { KitaWebDriver } from './..';

KitaWebDriver.new(`edge`).then((webdriver) => {
    webdriver.BrowserInstance?.navigate(`https://www.google.com`).then((browserInstance) => {
        console.log(browserInstance);
        browserInstance.close();
    });
}, (err) => {
    console.error(err);
});