import { Component, OnInit } from '@angular/core'
import { SetKeyboardOpenAction } from '@app/actions/ui/ui.actions'
import { selectInputHasFocus, selectKeyboardOpen } from '@app/actions/ui/ui.selectors'
import { selectSignUpInProgress } from '@app/actions/users/users.selectors'
import { State } from '@app/reducers'
import { DestroyerComponent } from '@app/utils/destroyer.component'
import { select, Store } from '@ngrx/store'
import { takeUntil } from 'rxjs/operators'

@Component({
  selector: 'app-keyboard-launcher',
  templateUrl: './keyboard-launcher.component.html',
  styleUrls: ['./keyboard-launcher.component.scss']
})

export class KeyboardLauncherComponent extends DestroyerComponent implements OnInit {

  inputHasFocus: boolean
  keyboardOpen: boolean
  signUpInProgress: boolean

  constructor(private store: Store<State>) {
    super()
  }

  ngOnInit() {

    // this.onOpenKeyboard()

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectKeyboardOpen)
    ).subscribe(keyboardOpen => {
      this.keyboardOpen = keyboardOpen
    })

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectInputHasFocus)
    ).subscribe(inputHasFocus => {
      this.inputHasFocus = inputHasFocus
    })

    this.store.pipe(
      takeUntil(this.unsubscribe$),
      select(selectSignUpInProgress)
    ).subscribe(signUpInProgress => {
      this.signUpInProgress = signUpInProgress == null
    })
  }

  onOpenKeyboard() {
    this.store.dispatch(new SetKeyboardOpenAction(true))
  }
}
