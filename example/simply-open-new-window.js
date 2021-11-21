'use strict'

const { Kita } = require('./..')

const webdriver = Kita.WebDriver.new('chrome')
webdriver.start().then(() => {
    console.log(webdriver)
}, (err) => {
    console.error(err)
})
