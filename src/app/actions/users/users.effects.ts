import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { map, mergeMap, tap } from 'rxjs/operators'
import { UserService } from '@app/services/user.service'
import {
  SetUserExistsAction,
  UsersActionTypes,
  GetUserExistsAction,
  SetLastUserLoggedInAction,
  GetLastUserLoggedInAction
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
