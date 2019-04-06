import { AppPage } from './app.po'
import { browser, logging } from 'protractor'

describe('workspace-project App', () => {
  let page: AppPage

  beforeEach(() => {
    page = new AppPage()
  })

  it('should display smallprint', () => {
    page.navigateTo().then()
    expect(page.getSmallPrintStrongText()).toEqual('Enter a username and password.').then()
  })

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    // noinspection JSIgnoredPromiseFromCall
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry))
  })
})
