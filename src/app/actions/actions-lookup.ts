import { QuestionsActionTypes, QuestionsFailedAction, QuestionsLoadedAction } from './questions/questions.actions'

export const ActionsLookup = {
  [QuestionsActionTypes.QuestionsLoaded]: QuestionsLoadedAction,
  [QuestionsActionTypes.QuestionsFailed]: QuestionsFailedAction
}
