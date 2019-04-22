import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { ResetStoreAction } from '@app/actions/init/init.actions'
import {
  CreateUserAction,
  GetLastUserLoggedInAction,
  GetUserExistsAction,
  LoginAction,
  LoginFailedAction,
  LoginSuccessAction,
  LogoutAction,
  SetLastUserLoggedInAction,
  SetUserExistsAction,
  UserRequestedAction,
  UsersActionTypes,
  WhoAmIAction,
  WhoAmIFailedAction
} from '@app/actions/users/users.actions'
import { StorageService } from '@app/services/storage.service'
import { UserService } from '@app/services/user.service'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { fromPromise } from 'rxjs/internal-compatibility'
import { delay, map, mapTo, mergeMap, tap } from 'rxjs/operators'

const lastUserLoggedInKey = 'lastUserLoggedIn'

@Injectable()

export class UsersEffects {

  @Effect()
  login$ = this.actions$.pipe(
    ofType<LoginAction>(UsersActionTypes.Login),
    mergeMap(action =>
      this.userService.login(action.payload)
    ),
    map(user => {
      if (user) return new LoginSuccessAction(user)
      return new LoginFailedAction()
    })
  )

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccessAction>(UsersActionTypes.LoginSuccess),
    delay(2000),
    map(action => ({
      action,
      originalUrl: this.router.url
    })),
    mergeMap(x =>
      fromPromise(this.router.navigateByUrl('/blank', {replaceUrl: true})).pipe(
        mapTo(x)
      )
    ),
    mergeMap(x =>
      fromPromise(this.router.navigateByUrl(x.originalUrl, {replaceUrl: true})).pipe(
        mapTo(x.action)
      )
    ),
    map(action => {
      const user = action.payload
      return new SetLastUserLoggedInAction({username: user.username})
    })
  )

  @Effect()
  getUserExists$ = this.actions$.pipe(
    ofType<GetUserExistsAction>(UsersActionTypes.GetUserExists),
    mergeMap(action =>
      this.userService.doesUserExist(action.payload)
    ),
    map(exists => new SetUserExistsAction(exists))
  )

  @Effect()
  getLastUserLoggedIn$ = this.actions$.pipe(
    ofType<GetLastUserLoggedInAction>(UsersActionTypes.GetLastUserLoggedIn),
    map(() => this.storageService.getLocalStorage(lastUserLoggedInKey)),
    map(lastUserLoggedIn => new SetLastUserLoggedInAction(lastUserLoggedIn))
  )

  @Effect({dispatch: false})
  setLastUserLoggedIn$ = this.actions$.pipe(
    ofType<SetLastUserLoggedInAction>(UsersActionTypes.SetLastUserLoggedIn),
    tap(({payload}) => this.storageService.setLocalStorage(lastUserLoggedInKey, payload))
  )

  @Effect()
  whoAmI$ = this.actions$.pipe(
    ofType<WhoAmIAction>(UsersActionTypes.WhoAmI),
    mergeMap(() =>
      this.userService.whoAmI()
    ),
    map(user => user == null ? new WhoAmIFailedAction() : new UserRequestedAction(user.username))
  )

  @Effect()
  createUser$ = this.actions$.pipe(
    ofType<CreateUserAction>(UsersActionTypes.CreateUser),
    mergeMap(action =>
      this.userService.create(action.payload)
    ),
    map(user => {
      if (user) return new LoginSuccessAction(user)
      return new LoginFailedAction()
    })
  )

  @Effect()
  logout$ = this.actions$.pipe(
    ofType<LogoutAction>(UsersActionTypes.Logout),
    mergeMap(() => this.userService.logout()),
    map(() => new ResetStoreAction())
  )

  constructor(private actions$: Actions, private userService: UserService, private storageService: StorageService, private router: Router) {}
}
