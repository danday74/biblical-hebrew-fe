import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { CreateUserAction, SetSignUpInProgressAction, UsersActions, UsersActionTypes } from '@app/actions/users/users.actions'
import { selectSignUpInProgress, selectUser } from '@app/actions/users/users.selectors'
import { State } from '@app/reducers'
import { UserService } from '@app/services/user.service'
import { DestroyerComponent } from '@app/utils/destroyer.component'
import { getDir } from '@app/utils/utils'
import { ActionsSubject, select, Store } from '@ngrx/store'
import { filter, takeUntil } from 'rxjs/operators'
import config from 'src/config'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent extends DestroyerComponent implements OnInit, OnDestroy {

  @ViewChild('submitButton') submitButton: ElementRef

  failedToCreateUserText = 'Failed to create user'
  incorrectPasswordText = 'Incorrect password'

  animateLoginNow = false
  captchaSuccess = false
  dirForUsername = 'ltr'
  loginError: string
  loginInProgress = false
  signUpInProgress: any
  siteKey = atob(config.recaptcha.siteKey)

  private passwordConfirmation = ''

  constructor(private userService: UserService, private store: Store<State>, private actionsSubject$: ActionsSubject) {
    super()
  }

  ngOnInit() {

    // animate on login
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectUser),
      filter(user => !!user)
    ).subscribe(() => {
      this.animateLoginNow = true
    })

    // defensive wrapper and stores credentials
    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectSignUpInProgress)
    ).subscribe(signUpInProgress => {
      this.signUpInProgress = signUpInProgress
      this.dirForUsername = getDir(this.signUpInProgress.username)
    })

    // handle failed login
    this.actionsSubject$.pipe(
      takeUntil(this.unsubscribe$),
      filter((action: UsersActions) => action.type === UsersActionTypes.LoginFailed)
    ).subscribe(() => {
      this.loginInProgress = false
      this.loginError = this.failedToCreateUserText
    })
  }

  onCaptchaResolved(captchaResponse: string) {
    this.userService.resolveCaptcha(captchaResponse).subscribe((res: any) => {
      this.captchaSuccess = res ? res.success : false
    })
  }

  onPasswordChange(password) {
    this.loginError = null
    this.passwordConfirmation = password
  }

  onCancel() {
    this.store.dispatch(new SetSignUpInProgressAction(null))
  }

  onEnter() {
    this.submitButton.nativeElement.click()
  }

  onSubmit() {
    if (this.signUpInProgress.password !== this.passwordConfirmation) {
      this.loginError = this.incorrectPasswordText
    } else {
      this.doLogin()
    }
  }

  private doLogin() {
    this.loginInProgress = true
    this.store.dispatch(new CreateUserAction(this.signUpInProgress))
  }
}
