import Kita from './..';

Kita.WebDriver.new(`chrome`).then((webdriver) => {
    console.log(webdriver);
    webdriver.BrowserInstance?.close().then(() => {
        console.log(`closed`);
    });
}, (err) => {
    console.error(err);
});
