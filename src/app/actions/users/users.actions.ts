import { Action } from '@ngrx/store'

export enum UsersActionTypes {
  UserRequested = '[Users] User Requested',
  UserLoaded = '[Users] User Loaded',
  UserFailed = '[Users] User Failed',

  Login = '[Users] Login',
  LoginSuccess = '[Users] Login Success',
  LoginFailed = '[Users] Login Failed',

  GetUserExists = '[Users] Get User Exists',
  SetUserExists = '[Users] Set User Exists',

  GetLastUserLoggedIn = '[Users] Get Last User Logged In',
  SetLastUserLoggedIn = '[Users] Set Last User Logged In',

  WhoAmI = '[Users] Who Am I',
  WhoAmIFailed = '[Users] Who Am I Failed',

  CreateUser = '[Users] Create User',
  Logout = '[Users] Logout',
  SetSignUpInProgress = '[Users] Set Sign Up In Progress',
  WebkitAutofillUsed = '[Users] Webkit Autofill Used'
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

export class GetUserExistsAction implements Action {
  readonly type = UsersActionTypes.GetUserExists

  constructor(public payload: any) {}
}

export class SetUserExistsAction implements Action {
  readonly type = UsersActionTypes.SetUserExists

  constructor(public payload: any) {}
}

export class GetLastUserLoggedInAction implements Action {
  readonly type = UsersActionTypes.GetLastUserLoggedIn
}

export class SetLastUserLoggedInAction implements Action {
  readonly type = UsersActionTypes.SetLastUserLoggedIn

  constructor(public payload: any) {}
}

export class WhoAmIAction implements Action {
  readonly type = UsersActionTypes.WhoAmI
}

export class WhoAmIFailedAction implements Action {
  readonly type = UsersActionTypes.WhoAmIFailed
}

export class CreateUserAction implements Action {
  readonly type = UsersActionTypes.CreateUser

  constructor(public payload: any) {}
}

export class LogoutAction implements Action {
  readonly type = UsersActionTypes.Logout
}

export class SetSignUpInProgressAction implements Action {
  readonly type = UsersActionTypes.SetSignUpInProgress

  constructor(public payload: any) {}
}

export class WebkitAutofillUsedAction implements Action {
  readonly type = UsersActionTypes.WebkitAutofillUsed
}

export type UsersActions =
  | UserRequestedAction
  | UserLoadedAction
  | UserFailedAction
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction
  | GetUserExistsAction
  | SetUserExistsAction
  | GetLastUserLoggedInAction
  | SetLastUserLoggedInAction
  | WhoAmIAction
  | WhoAmIFailedAction
  | CreateUserAction
  | LogoutAction
  | SetSignUpInProgressAction
  | WebkitAutofillUsedAction
