import { Component, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { State } from '@app/reducers'
import { selectUser } from './actions/users/users.selectors'
import * as Bowser from 'bowser'
import * as $ from 'jquery'

declare var slugify: (str, options) => any

const BROWSER_BLACKLIST = ['internet-explorer']

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  public user$
  public supported: boolean

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.manageBrowserSupport()
    this.user$ = this.store.pipe(select(selectUser))
  }

  private manageBrowserSupport() {
    const bro = Bowser.getParser(window.navigator.userAgent)
    const browser = bro.getBrowser()
    browser.name = slugify(browser.name, {lower: true})
    this.supported = !BROWSER_BLACKLIST.includes(browser.name)
    if (this.supported) $('html').addClass('supported').addClass(browser.name)
  }
}
