import { Action } from '@ngrx/store'

export enum AppActionTypes {
  QuestionsRequested = '[App] Questions Requested',
  QuestionsLoaded = '[App] Questions Loaded',
  GetCurrentUser = '[App] Get Current User',
  UserRequested = '[App] User Requested',
  UserLoaded = '[App] User Loaded'
}

export class QuestionsRequestedAction implements Action {
  readonly type = AppActionTypes.QuestionsRequested
}

export class QuestionsLoadedAction implements Action {
  readonly type = AppActionTypes.QuestionsLoaded

  constructor(public payload: any) {}
}

export class GetCurrentUserAction implements Action {
  readonly type = AppActionTypes.GetCurrentUser
}

export class UserRequestedAction implements Action {
  readonly type = AppActionTypes.UserRequested

  constructor(public payload: string) {}
}

export class UserLoadedAction implements Action {
  readonly type = AppActionTypes.UserLoaded

  constructor(public payload: any) {}
}

export type AppActions =
  | QuestionsRequestedAction
  | QuestionsLoadedAction
  | GetCurrentUserAction
  | UserRequestedAction
  | UserLoadedAction
