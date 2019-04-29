import * as pkg from '../../package.json'

export const environment = {
  debug: null,
  googleAnalyticsId: 'UA-139209087-2',
  httpPhp: 'http://localhost:4000/api',
  production: true,
  version: pkg.version,
  wsPhp: 'ws://localhost:4002'
}
