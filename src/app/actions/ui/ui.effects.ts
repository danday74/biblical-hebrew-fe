import { Injectable } from '@angular/core'
import { SetKeyboardOpenAction, UiActionTypes } from '@app/actions/ui/ui.actions'
import { Actions, Effect, ofType } from '@ngrx/effects'
import * as $ from 'jquery'
import { tap } from 'rxjs/operators'

const keyboardClass = 'keyboard'

@Injectable()
export class UiEffects {

  @Effect({dispatch: false})
  setKeyboardOpen$ = this.actions$.pipe(
    ofType<SetKeyboardOpenAction>(UiActionTypes.SetKeyboardOpen),
    tap(({payload}) => {
      const htmlTag = $('html')
      if (payload) {
        htmlTag.addClass(keyboardClass)
      } else {
        htmlTag.removeClass(keyboardClass)
      }
    })
  )

  constructor(private actions$: Actions) {}
}
