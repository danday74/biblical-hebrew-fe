import { Injectable } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { NavigationEnd, Router } from '@angular/router'
import config from '../../../config'
import titleLookup from './title-lookup.json'

@Injectable({providedIn: 'root'})

export class TitleService {

  private static blacklistedUrls = config.blacklistedUrls

  constructor(private router: Router, private title: Title) {}

  initTitleService() {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        let url = evt.urlAfterRedirects
        if (!TitleService.blacklistedUrls.includes(url)) {
          if (url.startsWith('/')) url = url.replace('/', '')
          const title = titleLookup[url] || 'Untitled'
          this.title.setTitle(`${config.app.label} - ${title}`)
        }
      }
    })
  }
}
