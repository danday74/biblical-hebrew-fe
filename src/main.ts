import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { AppModule } from '@app/app.module'
import { environment } from '@environments/environment'
import * as Debug from 'debug'
import { RecaptchaComponent } from 'ng-recaptcha'

const debug = Debug('bh:main')

if (environment.production) {
  enableProdMode()
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err))

RecaptchaComponent.prototype.ngOnDestroy = function() {
  if (this.subscription) {
    debug('RecaptchaComponent fix see https://github.com/DethAriel/ng-recaptcha/issues/123')
    this.subscription.unsubscribe()
  }
}
