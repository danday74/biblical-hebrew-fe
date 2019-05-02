import app from '../package.json'

const config = {
  app,
  blacklistedUrls: ['/', '/blank'],
  loginAnimations: [
    'bounceOut', 'bounceOutUp', 'bounceOutDown', 'fadeOut', 'fadeOutUp', 'fadeOutDown', 'flipOutX', 'flipOutY',
    'zoomOut', 'zoomOutUp', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight'
  ],
  loginDelay: 2000,
  recaptcha: {
    siteKey: 'NkxlZXdKMFVBQUFBQU1HSWRyRG9JYml5WDRuM2dBZjRlM2pnMHZkaw=='
  }
}

export default config
