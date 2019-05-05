import { Component, OnInit } from '@angular/core'
import { SetKeyboardOpenAction } from '@app/actions/ui/ui.actions'
import { selectKeyboardOpen } from '@app/actions/ui/ui.selectors'
import { State } from '@app/reducers'
import { select, Store } from '@ngrx/store'

@Component({
  selector: 'app-keyboard-button',
  templateUrl: './keyboard-button.component.html',
  styleUrls: ['./keyboard-button.component.scss']
})

export class KeyboardButtonComponent implements OnInit {

  keyboardOpen: boolean

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.pipe(
      select(selectKeyboardOpen)
    ).subscribe(keyboardOpen => {
      this.keyboardOpen = keyboardOpen
    })
  }

  onOpenKeyboard() {
    this.store.dispatch(new SetKeyboardOpenAction(true))
  }
}
