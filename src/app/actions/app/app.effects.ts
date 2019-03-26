import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { AppActionTypes, GetCurrentUserAction, UserRequestedAction } from '@app/actions/app/app.actions'
import { map } from 'rxjs/operators'
import { appConfig } from '@app/app.config'

@Injectable()

export class AppEffects {

  @Effect()
  getCurrentUser$ = this.actions$.pipe(
    ofType<GetCurrentUserAction>(AppActionTypes.GetCurrentUser),
    map(() => localStorage.getItem('user') || appConfig.defaultUser),
    map(user => new UserRequestedAction(user))
  )

  constructor(private actions$: Actions) {}
}
