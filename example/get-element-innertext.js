'use strict'

const { SystemHelper } = require('../lib/helpers/System.helper')
const { Kita } = require('./..')

const webdriver = Kita.WebDriver.new('chrome')
webdriver.start().then(() => {
    webdriver.browserInstance.navigate('https://www.google.com').then((browserInstance) => {
        SystemHelper.sleep(1000).then(() => {
            browserInstance.eval(`return document.querySelector('body').innerText`).then((response) => {
                console.log(response.value)
                browserInstance.close()
            })
        })
    })
}, (err) => {
    console.error(err)
})