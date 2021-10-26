const { exec } = require('child_process')

exports.start = (browser = 'chrome', remoteDebuggingPort = 9222, appUrl = 'http://127.0.0.1:3000') => {
  this.browserApp = null
  switch (browser) {
    case 'chrome':
      const options = [
        '--no-first-run',
        '--disable-client-side-phishing-detection',
        '--disable-infobars',
        '--disable-popup-blocking',
        '--disable-prompt-on-repost',
        '--disable-sync',
        '--enable-automation',
        '--ignore-certificate-errors',
        '--password-store=basic',
        '--safebrowsing-disable-auto-update',
        '--test-type=ui',
        '--no-default-browser-check',
        '--allow-file-access-from-files',
        '--force-renderer-accessibility',
        '--remote-debugging-port=' + remoteDebuggingPort,
        //'--user-data-dir=' + this.UserDataDir,
        '--new-window',
        '--download.prompt_for_download=false',
        '--enable-experimental-extension-apis',
        '--use-fake-device-for-media-stream',
        '--use-fake-ui-for-media-stream',
        '--disable-gpu',
        '--window-position=150,200',
        '--window-size=1024,920',
        '--app=' + appUrl
      ]

      this.browserApp = exec('start chrome data:, ' + options.join(' '));
    break

    case 'edge':

    break

    case 'firefox':
        throw 'Not supported yet'
        this.appInstance.setFirefoxOptions(options)
    break

    case 'ie':
        throw 'Not supported yet'
        this.appInstance.setIeOptions(options)
    break
  }
}