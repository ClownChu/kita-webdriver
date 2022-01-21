'use strict'

const { Kita } = require('./..')

const webdriver = Kita.WebDriver.new('chrome')
webdriver.start().then(() => {
    console.log(webdriver)
    webdriver.browserInstance.close()
}, (err) => {
    console.error(err)
})
