import { Action } from '@ngrx/store'

export enum UsersActionTypes {
  GetUserExists = '[Users] Get User Exists',
  SetUserExists = '[Users] Set User Exists',
  UserRequested = '[Users] User Requested',
  UserLoaded = '[Users] User Loaded',
  UserFailed = '[Users] User Failed',
  Logout = '[Users] Logout',
  GetLastUserLoggedIn = '[Users] Get Last User Logged In',
  SetLastUserLoggedIn = '[Users] Set Last User Logged In'
}

export class GetUserExistsAction implements Action {
  readonly type = UsersActionTypes.GetUserExists

  constructor(public payload: any) {}
}

export class SetUserExistsAction implements Action {
  readonly type = UsersActionTypes.SetUserExists

  constructor(public payload: any) {}
}

export class UserRequestedAction implements Action {
  readonly type = UsersActionTypes.UserRequested

  // noinspection JSUnusedGlobalSymbols
  constructor(public payload: any) {}
}

export class UserLoadedAction implements Action {
  readonly type = UsersActionTypes.UserLoaded

  constructor(public payload: any) {}
}

export class UserFailedAction implements Action {
  readonly type = UsersActionTypes.UserFailed
}

export class LogoutAction implements Action {
  readonly type = UsersActionTypes.Logout
}

export class GetLastUserLoggedInAction implements Action {
  readonly type = UsersActionTypes.GetLastUserLoggedIn
}

export class SetLastUserLoggedInAction implements Action {
  readonly type = UsersActionTypes.SetLastUserLoggedIn

  constructor(public payload: any) {}
}

export type UsersActions =
  | GetUserExistsAction
  | SetUserExistsAction
  | UserRequestedAction
  | UserLoadedAction
  | UserFailedAction
  | LogoutAction
  | GetLastUserLoggedInAction
  | SetLastUserLoggedInAction
