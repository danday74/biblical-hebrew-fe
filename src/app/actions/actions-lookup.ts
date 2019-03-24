import { AppActionTypes, QuestionsLoadedAction, QuestionsRequestedAction } from '@app/actions/app/app.actions'

export const ActionsLookup = {
  [AppActionTypes.QuestionsRequested]: QuestionsRequestedAction,
  [AppActionTypes.QuestionsLoaded]: QuestionsLoadedAction
}
