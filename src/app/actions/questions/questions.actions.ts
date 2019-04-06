import { Action } from '@ngrx/store'

export enum QuestionsActionTypes {
  QuestionsRequested = '[Questions] Questions Requested',
  QuestionsLoaded = '[Questions] Questions Loaded',
  QuestionsFailed = '[Questions] Questions Failed'
}

export class QuestionsRequestedAction implements Action {
  readonly type = QuestionsActionTypes.QuestionsRequested
}

export class QuestionsLoadedAction implements Action {
  readonly type = QuestionsActionTypes.QuestionsLoaded

  constructor(public payload: any) {}
}

export class QuestionsFailedAction implements Action {
  readonly type = QuestionsActionTypes.QuestionsFailed
}

export type QuestionsActions =
  | QuestionsRequestedAction
  | QuestionsLoadedAction
  | QuestionsFailedAction
