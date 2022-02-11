import { SystemHelper } from '../lib/helpers/System.helper';
import Kita from './..';

Kita.WebDriver.new(`chrome`).then((webdriver) => {
    webdriver.BrowserInstance?.navigate(`https://www.google.com`).then((browserInstance) => {
        SystemHelper.sleep(1000).then(() => {
            browserInstance.eval(`return document.querySelector('body').innerText`).then((response) => {
                console.log(response.value);
                browserInstance.close();
            });
        });
    });
}, (err) => {
    console.error(err);
});