import { Injectable, Injector } from '@angular/core'
import { InitAction, InitActionTypes, InitOnLoginAction } from '@app/actions/init/init.actions'
import { QuestionsRequestedAction } from '@app/actions/questions/questions.actions'
import { GetLastUserLoggedInAction, WhoAmIAction } from '@app/actions/users/users.actions'
import { ServiceLocator } from '@app/service-locator.service'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { defer, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'

@Injectable()

export class InitEffects {

  @Effect()
  appInit$ = this.actions$.pipe(
    ofType<InitAction>(InitActionTypes.Init),
    mergeMap(() => of(
      new WhoAmIAction(),
      new GetLastUserLoggedInAction()
    ))
  )

  @Effect()
  appInitOnLogin$ = this.actions$.pipe(
    ofType<InitOnLoginAction>(InitActionTypes.InitOnLogin),
    mergeMap(() => of(
      new QuestionsRequestedAction()
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
