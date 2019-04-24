import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { CustomAction } from '@app/actions/custom-action'
import {
  GetUserExistsAction,
  LoginAction,
  SetLastUserLoggedInAction,
  SetSignUpInProgressAction,
  UsersActions,
  UsersActionTypes,
  WebkitAutofillUsedAction
} from '@app/actions/users/users.actions'
import { selectLastUserLoggedIn, selectUser, selectWebkitAutofillUsed } from '@app/actions/users/users.selectors'
import { PasswordComponent } from '@app/base/shared/password/password.component'
import { State } from '@app/reducers'
import { DestroyerComponent } from '@app/utils/destroyer.component'
import { getBrowser } from '@app/utils/utils'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { ActionsSubject, select, Store } from '@ngrx/store'
import * as $ from 'jquery'
import { cloneDeep, debounce } from 'lodash'
import { filter, take, takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent extends DestroyerComponent implements OnInit, OnDestroy {

  @ViewChild('usernameInput') usernameInput: ElementRef
  @ViewChild(PasswordComponent) passwordComponent: PasswordComponent
  @ViewChild('submitButton') submitButton: ElementRef

  faCheck = faCheck
  faTimes = faTimes

  user = {
    username: '',
    password: ''
  }

  alternativeUsernameUpdateInProgress = false
  boardTextUpdateInProgress = false
  usernameUpdateInProgress = false

  animateLoginNow = false
  badCredentials = false
  boardText1 = ''
  boardText2 = ''
  dirForUsername = 'ltr'
  loginInProgress = false
  pattern = '^[a-zA-Z0-9\u0590-\u05FF]+$'
  userExists = 'no'
  webkitAutofillUsed = false

  constructor(private store: Store<State>, private actionsSubject$: ActionsSubject) {
    super()
    this.onSubmit = debounce(this.onSubmit, 300, {leading: true, trailing: false})
    this.onUsernameChange = debounce(this.onUsernameChange, 300, {leading: false, trailing: true})
  }

  ngOnInit() {

    // initialise username and focus
    this.store.pipe(
      select(selectLastUserLoggedIn),
      take(1)
    ).subscribe((lastUserLoggedIn: any) => {
      if (lastUserLoggedIn) {
        this.onUsernameChange(lastUserLoggedIn.username)
        setTimeout(() => { this.usernameInput.nativeElement.focus() }, 500)
      }
    })

    // animate on login
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectUser),
      filter(user => !!user)
    ).subscribe(() => {
      this.animateLoginNow = true
    })

    // handle password manager link
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectWebkitAutofillUsed),
      take(1)
    ).subscribe(webkitAutofillUsed => {
      this.webkitAutofillUsed = webkitAutofillUsed
    })

    // need to listen for an action here (fires every time) instead of using a memoized selector
    // handle username change
    this.actionsSubject$.pipe(
      takeUntil(this.unsubscribe$),
      filter((action: UsersActions) => action.type === UsersActionTypes.SetUserExists)
    ).subscribe((action: CustomAction) => {
      this.userExists = action.payload
      this.usernameUpdateInProgress = false
      this.alternativeUsernameUpdateInProgress = false
      this.updateBoardText()
    })

    // handle failed login
    this.actionsSubject$.pipe(
      takeUntil(this.unsubscribe$),
      filter((action: UsersActions) => action.type === UsersActionTypes.LoginFailed)
    ).subscribe(() => {
      // TODO: Assumes a 401
      this.badCredentials = true
      this.loginInProgress = false
      this.updateBoardText()
    })

    this.updateBoardText()
  }

  onUsernameChangeNoDebounce(username) {
    this.preUsernameChange(username) // do this with no debounce
    this.onUsernameChange(username)
  }

  onPasswordChange(password) {
    this.badCredentials = false
    this.user.password = password
    this.updateBoardText()
  }

  onEnter(evt) {
    const name = evt.target.getAttribute('name')
    if (name === 'bhUsername') {
      this.passwordComponent.passwordInput.nativeElement.focus()
    } else if (name === 'bhPassword') {
      this.submitButton.nativeElement.click()
    }
  }

  onForget() {
    // Clear password too?
    this.onUsernameChange('')
    this.store.dispatch(new SetLastUserLoggedInAction(null))
    this.usernameInput.nativeElement.focus()
  }

  onSubmit() {
    let webkitAutofill = false
    const browserSlug = getBrowser().slug
    if (browserSlug === 'chrome') webkitAutofill = !!$(':-webkit-autofill').length
    if (webkitAutofill) this.store.dispatch(new WebkitAutofillUsedAction())
    if (this.userExists === 'yes') {
      this.doLogin()
    } else {
      this.doSignUp()
    }
  }

  private doLogin() {
    this.loginInProgress = true
    this.store.dispatch(new LoginAction(cloneDeep(this.user)))
  }

  private doSignUp() {
    this.store.dispatch(new SetSignUpInProgressAction(this.user))
  }

  private preUsernameChange(username) {
    this.dirForUsername = this.hasHebrewCharsOnly(username) ? 'rtl' : 'ltr'
    if (!this.hasInvalidChars(this.user.username) && this.boardText1 !== 'Have we') {
      this.usernameUpdateInProgress = true
    } else {
      this.alternativeUsernameUpdateInProgress = true
    }
  }

  private onUsernameChange(username) {
    this.preUsernameChange(username)
    this.store.dispatch(new GetUserExistsAction(username))
    this.badCredentials = false
    this.user.username = username
    this.updateBoardText()
  }

  private updateBoardText() {

    const prevBoardText1 = this.boardText1
    const prevBoardText2 = this.boardText2

    if (this.userExists === 'yes') {
      this.boardText1 = 'Shalom'
      this.boardText2 = this.user.username
    } else if (this.userExists === 'no') {
      this.boardText1 = 'Have we'
      this.boardText2 = 'met?'
    } else {
      this.boardText1 = 'Our server'
      this.boardText2 = 'is down'
    }

    if (this.hasInvalidChars(this.user.username) || this.hasInvalidChars(this.user.password)) {
      this.boardText1 = 'Disallowed'
      this.boardText2 = 'Characters'
    }

    if (this.badCredentials) {
      this.boardText1 = 'Incorrect'
      this.boardText2 = 'Password'
    }

    if (this.boardText1 !== prevBoardText1 || this.boardText2 !== prevBoardText2) {
      this.boardTextUpdateInProgress = true
      setTimeout(() => {
        this.boardTextUpdateInProgress = false
      }, 300)
    }
  }

  private hasInvalidChars(str) {
    return str && !RegExp(this.pattern).test(str)
  }

  // noinspection JSMethodCanBeStatic
  private hasHebrewCharsOnly(str) {
    return str && RegExp('^[\u0590-\u05FF]+$').test(str)
  }
}
