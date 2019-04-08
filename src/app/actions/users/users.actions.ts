import { Action } from '@ngrx/store'

export enum UsersActionTypes {
  GetUserExists = '[Users] Get User Exists',
  SetUserExists = '[Users] Set User Exists',
  Login = '[Users] Login',
  LoginSuccess = '[Users] Login Success',
  LoginFailed = '[Users] Login Failed',
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

export class LoginAction implements Action {
  readonly type = UsersActionTypes.Login
  constructor(public payload: any) {}
}

export class LoginSuccessAction implements Action {
  readonly type = UsersActionTypes.LoginSuccess

  constructor(public payload: any) {}
}

export class LoginFailedAction implements Action {
  readonly type = UsersActionTypes.LoginFailed
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
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutAction
  | GetLastUserLoggedInAction
  | SetLastUserLoggedInAction
