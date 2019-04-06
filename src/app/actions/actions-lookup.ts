import { QuestionsActionTypes, QuestionsLoadedAction, QuestionsFailedAction } from './questions/questions.actions'
import { UsersActionTypes, UserLoadedAction, UserFailedAction } from './users/users.actions'

export const ActionsLookup = {
  [QuestionsActionTypes.QuestionsLoaded]: QuestionsLoadedAction,
  [QuestionsActionTypes.QuestionsFailed]: QuestionsFailedAction,
  [UsersActionTypes.UserLoaded]: UserLoadedAction,
  [UsersActionTypes.UserFailed]: UserFailedAction
}
