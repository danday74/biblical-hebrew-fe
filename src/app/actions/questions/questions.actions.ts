import { Action } from '@ngrx/store'

export enum QuestionsActionTypes {
  QuestionsRequested = '[Questions] Questions Requested',
  QuestionsLoaded = '[Questions] Questions Loaded'
}

export class QuestionsRequestedAction implements Action {
  readonly type = QuestionsActionTypes.QuestionsRequested
}

export class QuestionsLoadedAction implements Action {
  readonly type = QuestionsActionTypes.QuestionsLoaded

  constructor(public payload: any) {}
}

export type QuestionsActions =
  | QuestionsRequestedAction
  | QuestionsLoadedAction
