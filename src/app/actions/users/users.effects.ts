import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, mergeMap, tap } from 'rxjs/operators'
import { UserService } from '@app/services/user.service'
import {
  GetLastUserLoggedInAction,
  GetUserExistsAction,
  LoginAction,
  LoginFailedAction,
  LoginSuccessAction,
  SetLastUserLoggedInAction,
  SetUserExistsAction,
  UsersActionTypes
} from '@app/actions/users/users.actions'
import { StorageService } from '@app/services/storage.service'

const lastUserLoggedInKey = 'lastUserLoggedIn'

@Injectable()

export class UsersEffects {

  @Effect()
  userExists$ = this.actions$.pipe(
    ofType<GetUserExistsAction>(UsersActionTypes.GetUserExists),
    mergeMap((action) =>
      this.userService.doesUserExist(action.payload)
    ),
    map((exists) => new SetUserExistsAction(exists))
  )

  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginAction>(UsersActionTypes.Login),
    mergeMap((action) =>
      this.userService.login(action.payload)
    ),
    map((user) => {
      if (user) return new LoginSuccessAction(user)
      return new LoginFailedAction()
    })
  )

  @Effect()
  getLastUserLoggedIn$ = this.actions$.pipe(
    ofType<GetLastUserLoggedInAction>(UsersActionTypes.GetLastUserLoggedIn),
    map(() => this.storageService.getLocalStorage(lastUserLoggedInKey)),
    map((lastUserLoggedIn) => new SetLastUserLoggedInAction(lastUserLoggedIn))
  )

  @Effect({dispatch: false})
  setLastUserLoggedIn$ = this.actions$.pipe(
    ofType<SetLastUserLoggedInAction>(UsersActionTypes.SetLastUserLoggedIn),
    tap(({payload}) => this.storageService.setLocalStorage(lastUserLoggedInKey, payload))
  )

  constructor(private actions$: Actions, private userService: UserService, private storageService: StorageService) {}
}
