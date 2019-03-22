import { Action } from '@ngrx/store'

export enum AppActionTypes {
  QuestionsRequested = '[App] Questions Requested',
  QuestionsLoaded = '[App] Questions Loaded'
}

export class QuestionsRequestedAction implements Action {
  readonly type = AppActionTypes.QuestionsRequested
}

export class QuestionsLoadedAction implements Action {
  readonly type = AppActionTypes.QuestionsLoaded
  constructor(public payload) {}
}

export type AppActions =
  | QuestionsRequestedAction
  | QuestionsLoadedAction
