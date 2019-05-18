import { Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { NavigationEnd, Router } from '@angular/router'
import { selectSignUpInProgress, selectUser } from '@app/actions/users/users.selectors'
import { State } from '@app/reducers'
import { select, Store } from '@ngrx/store'
import config from '../../app.config'
import titleLookup from './title-lookup.json'

@Injectable({providedIn: 'root'})

export class TitleService {

  private static blacklistedUrls = config.blacklistedUrls
  private static appLabel = config.app.label

  ready = false
  signUpInProgress: any
  url: string
  user: any

  constructor(private router: Router, private store: Store<State>, private title: Title) {

    setTimeout(() => {
      this.ready = true
      this.setTitle()
    }, config.loginDelay)

    this.store.pipe(
      select(selectUser)
    ).subscribe(user => {
      this.user = user
      if (user) {
        setTimeout(() => {
          this.setTitle()
        }, config.loginDelay)
      } else {
        this.setTitle()
      }
    })

    this.store.pipe(
      select(selectSignUpInProgress)
    ).subscribe(signUpInProgress => {
      this.signUpInProgress = signUpInProgress
      this.setTitle()
    })
  }

  initTitleService() {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        this.url = evt.urlAfterRedirects
        this.setTitle()
      }
    })
  }

  forceSetTitle() {
    this.setTitle(this.router.url)
  }

  private setTitle(url = this.url) {
    this.url = url
    if (this.url) {
      if (this.signUpInProgress) {
        this.title.setTitle(`${TitleService.appLabel} - Sign Up`)
      } else if (!this.user && this.ready) {
        this.title.setTitle(`${TitleService.appLabel} - Login`)
      } else if (!TitleService.blacklistedUrls.includes(this.url)) {
        const title = titleLookup[this.url] || 'Untitled'
        this.title.setTitle(`${TitleService.appLabel} - ${title}`)
      }
    }
  }
}
