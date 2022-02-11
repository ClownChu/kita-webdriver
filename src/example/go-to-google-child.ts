import Kita from './..';

Kita.WebDriver.new(`chrome`).then((webdriver) => {
    webdriver.BrowserInstance?.navigate(`https://www.google.com`).then((browserInstance) => {
        console.log(browserInstance);
        browserInstance.close();
    });
}, (err) => {
    console.error(err);
});