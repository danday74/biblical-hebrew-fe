import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { ScriptService } from '@app/services/script.service'
import { environment } from '@environments/environment'
import * as Debug from 'debug'

const debug = Debug('bh:google-analytics')

@Injectable({providedIn: 'root'})

export class GoogleAnalyticsService {

  private lastUrl: string = null
  private tracker: any
  private untrackedUrls = ['/', '/blank']

  constructor(private router: Router, private scriptService: ScriptService) {}

  loadGoogleAnalytics() {
    const googleAnalyticsId = environment.googleAnalyticsId
    this.scriptService.loadScript('https://www.googletagmanager.com/gtag/js?id=' + googleAnalyticsId).then(
      () => {
        let dataLayer = (window as any).dataLayer
        dataLayer = dataLayer || []
        const gtag = function(x, y) {dataLayer.push(arguments)} // tslint:disable-line:only-arrow-functions
        gtag('js', new Date())
        gtag('config', googleAnalyticsId)
        this.initTracker()
      }
    ).catch(() => {
      debug('failed to load Google Analytics')
    })
  }

  sendEvent(category: string, action: string, label: any = null) {
    debug(`sendEvent ${category} ${action} ${label}`)
    // noinspection JSUnusedGlobalSymbols
    this.tracker.send('event', category, action, label, {
      hitCallback: () => {
        debug(`success ${category} ${action} ${label}`)
      }
    })
  }

  sendPageView(url: string) {
    this.tracker.set('page', url)
    this.tracker.send('pageview')
  }

  private initTracker() {
    const interval = setInterval(() => {
      const ga = (window as any).ga
      if (ga && ga.getAll) {
        this.tracker = ga.getAll()[0]
        this.initGoogleAnalyticsPageView()
        clearInterval(interval)
      }
    }, 50)
  }

  private initGoogleAnalyticsPageView() {
    this.lastUrl = this.router.url
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        const url = evt.urlAfterRedirects
        if (!this.untrackedUrls.includes(url)) {
          if (url !== this.lastUrl) {
            this.lastUrl = url
            this.sendPageView(url)
          }
        }
      }
    })
  }
}
