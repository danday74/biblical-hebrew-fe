import { AppActionTypes, QuestionsLoadedAction, UserLoadedAction } from '@app/actions/app/app.actions'

export const ActionsLookup = {
  [AppActionTypes.QuestionsLoaded]: QuestionsLoadedAction,
  [AppActionTypes.UserLoaded]: UserLoadedAction
}
