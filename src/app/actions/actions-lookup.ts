import { QuestionsActionTypes, QuestionsFailedAction, QuestionsLoadedAction } from './questions/questions.actions'
import { UserFailedAction, UserLoadedAction, UsersActionTypes } from './users/users.actions'

export const ActionsLookup = {
  [QuestionsActionTypes.QuestionsLoaded]: QuestionsLoadedAction,
  [QuestionsActionTypes.QuestionsFailed]: QuestionsFailedAction,
  [UsersActionTypes.UserLoaded]: UserLoadedAction,
  [UsersActionTypes.UserFailed]: UserFailedAction
}
