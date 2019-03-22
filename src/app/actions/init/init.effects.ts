import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { InitAction, InitActionTypes } from '@app/actions/init/init.actions'
import { defer, of } from 'rxjs'
import { QuestionsRequestedAction } from '@app/actions/app/app.actions'
import { map, tap } from 'rxjs/operators'

@Injectable()

export class InitEffects {

  @Effect()
  appInit$ = this.actions$.pipe(
    ofType<InitAction>(InitActionTypes.Init),
    map(() => new QuestionsRequestedAction())
  )

  // init$ = defer must be last
  @Effect()
  init$ = defer(() => {
    return of(new InitAction())
  })

  constructor(private actions$: Actions) {}
}
