import { KitaWebDriver } from './..';

KitaWebDriver.new(`chrome`).then((webdriver) => {
    webdriver.BrowserInstance?.navigate(`https://www.google.com`).then((browserInstance) => {
        browserInstance.captureScreenshot().then((base64String) => {
            browserInstance.navigate(`data:image/jpeg;base64,${base64String}`).then((browserInstance) => {
                new Promise((resolve) => {
                    setTimeout(resolve, 5000);
                }).then(() => {
                    browserInstance.close();
                });
            });
        }); 
    });
}, (err) => {
    console.error(err);
});