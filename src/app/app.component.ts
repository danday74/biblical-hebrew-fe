import { Component, OnInit } from '@angular/core'
import { State } from '@app/reducers'
import { GoogleAnalyticsService } from '@app/services/google-analytics/google-analytics.service'
import { TitleService } from '@app/services/title/title.service'
import { getBrowser } from '@app/utils/utils'
import { select, Store } from '@ngrx/store'
import * as $ from 'jquery'
import { combineLatest } from 'rxjs'
import { filter, take } from 'rxjs/operators'
import { selectSignUpInProgress, selectUser, selectWhoAmICheck } from './actions/users/users.selectors'
import config from './app.config'

enum BrowserSupport {
  Unsupported = 'unsupported',
  Partial = 'partial',
  Supported = 'supported'
}

const browserBlacklist = ['internet-explorer']
const browserWhitelist = ['chrome', 'microsoft-edge', 'firefox']
const ignorePartialBrowserWarningKey = 'ignorePartialBrowserSupportWarning'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  allowAccess = false
  signUpInProgress: any
  supported: BrowserSupport
  user: any
  whoAmICheck: boolean

  constructor(private googleAnalyticsService: GoogleAnalyticsService, private store: Store<State>, private titleService: TitleService) {}

  ngOnInit() {
    this.manageBrowserSupport()
    if (this.supported === BrowserSupport.Supported) {
      this.proceed()
    } else if (this.supported === BrowserSupport.Partial) {
      // intentionally not using service here (keep code simple until access is allowed)
      if (localStorage.getItem(ignorePartialBrowserWarningKey) === 'true') {
        this.proceedAnyway()
      }
    }
  }

  proceedAnyway() {
    // intentionally not using service here (keep code simple until access is allowed)
    localStorage.setItem(ignorePartialBrowserWarningKey, 'true')
    $('html').addClass('proceed')
    this.titleService.forceSetTitle()
    this.proceed()
  }

  proceed() {

    this.allowAccess = true
    this.googleAnalyticsService.loadGoogleAnalytics()
    this.titleService.initTitleService()

    // whoami
    this.store.pipe(
      select(selectWhoAmICheck),
      filter(whoAmICheck => whoAmICheck != null),
      take(1)
    ).subscribe(whoAmICheck => {
      this.whoAmICheck = whoAmICheck
    })

    // get user and allow delay for login animation (when set login pages disappear)
    combineLatest(
      this.store.pipe(select(selectUser)),
      this.store.pipe(select(selectWhoAmICheck))
    ).pipe(
      filter(([user, whoAmICheck]) => whoAmICheck != null)
    ).subscribe(([user, whoAmICheck]) => {
      if (user && whoAmICheck === false) {
        setTimeout(() => {
          this.user = user
        }, config.loginDelay)
      } else {
        this.user = user
      }
    })

    // show sign up page
    this.store.pipe(
      select(selectSignUpInProgress)
    ).subscribe(signUpInProgress => {
      this.signUpInProgress = signUpInProgress
    })
  }

  private manageBrowserSupport() {

    const browser = getBrowser()

    const slug = browser.browser.slug

    if (browserWhitelist.includes(slug)) {
      this.supported = BrowserSupport.Supported
    } else if (browserBlacklist.includes(slug)) {
      this.supported = BrowserSupport.Unsupported
    } else {
      this.supported = BrowserSupport.Partial
    }

    const platform = browser.platform.type

    if (platform === 'mobile') {
      this.supported = BrowserSupport.Unsupported
      $('#js-hook-unsupported').text('does not support mobile devices')
    }

    $('html').addClass(this.supported).addClass(slug).addClass(platform)
  }
}
