import { Injectable, Injector } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { InitAction, InitActionTypes } from '@app/actions/init/init.actions'
import { defer, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { ServiceLocator } from '@app/service-locator.service'
import { QuestionsRequestedAction } from '@app/actions/questions/questions.actions'
import { GetLastUserLoggedInAction } from '@app/actions/users/users.actions'

@Injectable()

export class InitEffects {

  @Effect()
  appInit$ = this.actions$.pipe(
    ofType<InitAction>(InitActionTypes.Init),
    mergeMap(() => of(
      new QuestionsRequestedAction(),
      new GetLastUserLoggedInAction()
    ))
  )

  // init$ = defer must be last
  @Effect()
  init$ = defer(() => {
    return of(new InitAction())
  })

  constructor(private actions$: Actions, private injector: Injector) {
    ServiceLocator.injector = this.injector
  }
}
