'use strict'

const { Kita } = require('./..')

const webdriver = Kita.WebDriver.new('chrome')

webdriver.start().then(() => {
    webdriver.browserInstance.navigate('https://www.google.com').then((browserInstance) => {
        console.log(browserInstance)
        browserInstance.close()
    })
}, (err) => {
    console.error(err)
})