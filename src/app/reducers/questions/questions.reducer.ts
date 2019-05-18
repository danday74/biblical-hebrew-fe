import { QuestionsActions, QuestionsActionTypes } from '@app/actions/questions/questions.actions'

export interface QuestionsState {
  questions: any
}

export const initialQuestionsState: QuestionsState = {
  questions: {}
}

export const questionsReducer = (state = initialQuestionsState, action: QuestionsActions): QuestionsState => {

  switch (action.type) {

    case QuestionsActionTypes.QuestionsLoaded:
      return {
        ...state,
        questions: action.payload
      }

    default:
      return state
  }
}
