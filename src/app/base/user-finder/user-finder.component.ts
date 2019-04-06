import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActionsSubject, select, Store } from '@ngrx/store'
import { State } from '@app/reducers'
import { cloneDeep, debounce } from 'lodash'
import { faCheck, faEye } from '@fortawesome/free-solid-svg-icons'
import { selectUserExists } from '@app/actions/users/users.selectors'
import { GetUserExistsAction, UserRequestedAction, UsersActions, UsersActionTypes } from '@app/actions/users/users.actions'
import { filter } from 'rxjs/operators'

const DEFAULT_BOARD_TEXT_1 = 'Have we'
const DEFAULT_BOARD_TEXT_2 = 'met?'

@Component({
  selector: 'app-user-finder',
  templateUrl: './user-finder.component.html',
  styleUrls: ['./user-finder.component.scss']
})

export class UserFinderComponent implements OnInit {

  @ViewChild('passwordInput') passwordInput: ElementRef
  @ViewChild('submitButton') submitButton: ElementRef
  faCheck = faCheck
  faEye = faEye

  boardText1 = DEFAULT_BOARD_TEXT_1
  boardText2 = DEFAULT_BOARD_TEXT_2
  boardTextUpdateInProgress = false

  user = {
    username: '',
    password: ''
  }

  animateNow = false
  userExists = 'no'
  showPassword = false
  pattern = '^[a-zA-Z0-9\u0590-\u05FF]+$'
  badCredentials = false

  constructor(private store: Store<State>, private actionsSubject$: ActionsSubject) {
    this.usernameChange = debounce(this.usernameChange, 300, {leading: false, trailing: true})
    this.onSubmit = debounce(this.onSubmit, 300, {leading: true, trailing: false})
  }

  ngOnInit() {
    setTimeout(() => {
      this.animateNow = true
    }, 2000)
    this.store.pipe(select(selectUserExists)).subscribe(userExists => {
      this.userExists = userExists
      this.updateBoardText()
    })
    this.actionsSubject$.pipe(
      filter((action: UsersActions) => action.type === UsersActionTypes.UserFailed)
    ).subscribe(() => {
      this.badCredentials = true
      this.updateBoardText()
    })
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
      this.boardText1 = DEFAULT_BOARD_TEXT_1
      this.boardText2 = DEFAULT_BOARD_TEXT_2
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
      })
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
    this.store.dispatch(new UserRequestedAction(cloneDeep(this.user)))
  }

  private doSignUp() {
    console.log('doSignUp')
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
