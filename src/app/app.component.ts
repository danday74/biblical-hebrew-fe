import { Component, OnInit } from '@angular/core'
import { State } from '@app/reducers'
import { GoogleAnalyticsService } from '@app/services/google-analytics/google-analytics.service'
import { TitleService } from '@app/services/title/title.service'
import { getBrowser } from '@app/utils/utils'
import { select, Store } from '@ngrx/store'
import * as $ from 'jquery'
import { combineLatest } from 'rxjs'
import { filter, take } from 'rxjs/operators'
import config from '../config'
import { selectSignUpInProgress, selectUser, selectWhoAmICheck } from './actions/users/users.selectors'

enum BrowserSupport {
  Unsupported = 'unsupported',
  Partial = 'partial',
  Supported = 'supported'
}

const browserBlacklist = ['internet-explorer']
const browserWhitelist = ['chrome', 'edge', 'firefox']
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
    } else {
      // intentionally not using service here (keep code simple until access is allowed)
      if (localStorage.getItem(ignorePartialBrowserWarningKey) === 'true') {
        this.proceedAnyway()
      }
    }
  }

  proceedAnyway() {
    $('html').addClass('proceed')
    // intentionally not using service here (keep code simple until access is allowed)
    localStorage.setItem(ignorePartialBrowserWarningKey, 'true')
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
    const browserSlug = getBrowser().slug
    if (browserWhitelist.includes(browserSlug)) {
      this.supported = BrowserSupport.Supported
    } else if (browserBlacklist.includes(browserSlug)) {
      this.supported = BrowserSupport.Unsupported
    } else {
      this.supported = BrowserSupport.Partial
    }
    $('html').addClass(this.supported).addClass(browserSlug)
  }
}
