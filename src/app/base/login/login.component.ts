import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ActionsSubject, select, Store } from '@ngrx/store'
import { State } from '@app/reducers'
import { cloneDeep, debounce } from 'lodash'
import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons'
import { selectLastUserLoggedIn, selectUser, selectUserExists } from '@app/actions/users/users.selectors'
import {
  GetUserExistsAction,
  LoginAction,
  SetLastUserLoggedInAction,
  SetSignUpInProgressAction,
  UsersActions,
  UsersActionTypes
} from '@app/actions/users/users.actions'
import { filter, take, takeUntil } from 'rxjs/operators'
import { Router } from '@angular/router'
import { getRandomItemFromArray } from '@app/utils/utils'
import { Subject } from 'rxjs'

const LOGIN_ANIMATIONS = [
  'bounceOut', 'bounceOutUp', 'bounceOutDown', 'fadeOut', 'fadeOutUp', 'fadeOutDown', 'flipOutX', 'flipOutY',
  'zoomOut', 'zoomOutUp', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight'
]

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('usernameInput') usernameInput: ElementRef
  @ViewChild('passwordInput') passwordInput: ElementRef
  @ViewChild('submitButton') submitButton: ElementRef

  private unsubscribe$ = new Subject()

  faCheck = faCheck
  faEye = faEye

  boardText1 = ''
  boardText2 = ''
  boardTextUpdateInProgress = false
  showBoardText = false

  user = {
    username: '',
    password: ''
  }

  loginAnimation: string
  animateLoginNow = false
  animateTitleNow = false
  userExists = 'no'
  showPassword = false
  pattern = '^[a-zA-Z0-9\u0590-\u05FF]+$'
  badCredentials = false

  constructor(private store: Store<State>, private actionsSubject$: ActionsSubject, private router: Router) {
    this.usernameChange = debounce(this.usernameChange, 300, {leading: false, trailing: true})
    this.onSubmit = debounce(this.onSubmit, 300, {leading: true, trailing: false})
  }

  ngOnInit() {

    this.loginAnimation = getRandomItemFromArray(LOGIN_ANIMATIONS)

    setTimeout(() => {
      this.animateTitleNow = true
    }, 2000)

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectUser),
      filter(user => !!user)
    ).subscribe(user => {
      this.animateLoginNow = true
      setTimeout(() => {
        const originalUrl = this.router.url
        this.router.navigateByUrl('/blank', {replaceUrl: true}).then(() => {
          return this.router.navigateByUrl(originalUrl, {replaceUrl: true})
        }).then(() => {
          this.store.dispatch(new SetLastUserLoggedInAction({username: user.username}))
        })
      }, 2000)
    })
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectUserExists)
    ).subscribe(userExists => {
      this.userExists = userExists
      this.updateBoardText()
    })
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectLastUserLoggedIn),
      take(1)
    ).subscribe((lastUserLoggedIn: any) => {
      if (lastUserLoggedIn) {
        this.usernameChange(lastUserLoggedIn.username)
        setTimeout(() => { this.usernameInput.nativeElement.focus() }, 500)
      }
      setTimeout(() => {this.showBoardText = true}, 500)
    })
    this.actionsSubject$.pipe(
      takeUntil(this.unsubscribe$),
      filter((action: UsersActions) => action.type === UsersActionTypes.LoginFailed)
    ).subscribe(() => {
      this.badCredentials = true
      this.updateBoardText()
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  usernameChange(username) {
    this.store.dispatch(new GetUserExistsAction(username))
    this.badCredentials = false
    this.user.username = username
    this.updateBoardText()
  }

  passwordChange(password) {
    this.badCredentials = false
    this.user.password = password
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

  onSubmit() {
    if (this.userExists === 'yes') {
      this.doLogin()
    } else {
      this.doSignUp()
    }
  }

  private doLogin() {
    this.store.dispatch(new LoginAction(cloneDeep(this.user)))
  }

  private doSignUp() {
    this.store.dispatch(new SetSignUpInProgressAction(true))
  }

  showPwd() {
    this.showPassword = true
  }

  noShowPwd() {
    this.showPassword = false
  }

  onEnter(evt) {
    const name = evt.target.getAttribute('name')
    if (name === 'bhUsername') {
      this.passwordInput.nativeElement.focus()
    } else if (name === 'bhPassword') {
      this.submitButton.nativeElement.click()
    }
  }
}
