import { browser, by, element } from 'protractor'

export class AppPage {

  // noinspection JSMethodCanBeStatic
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>
  }

  // noinspection JSMethodCanBeStatic
  getSmallPrintStrongText() {
    return element(by.css('app-root .small-print-strong')).getText() as Promise<string>
  }
}
