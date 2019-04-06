import { Action } from '@ngrx/store'

export enum UsersActionTypes {
  GetUserExists = '[Users] Get User Exists',
  SetUserExists = '[Users] Set User Exists'
}

export class GetUserExistsAction implements Action {
  readonly type = UsersActionTypes.GetUserExists

  constructor(public payload: any) {}
}

export class SetUserExistsAction implements Action {
  readonly type = UsersActionTypes.SetUserExists

  constructor(public payload: any) {}
}

export type UsersActions =
  | GetUserExistsAction
  | SetUserExistsAction
