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

const browserBlacklist = ['internet-explorer']

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public signUpInProgress: boolean
  public supported: boolean
  public user: any
  public whoAmICheck: boolean

  constructor(private googleAnalyticsService: GoogleAnalyticsService, private store: Store<State>, private titleService: TitleService) {}

  ngOnInit() {

    this.manageBrowserSupport()
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
    this.supported = !browserBlacklist.includes(browserSlug)
    if (this.supported) $('html').addClass('supported').addClass(browserSlug)
  }
}
