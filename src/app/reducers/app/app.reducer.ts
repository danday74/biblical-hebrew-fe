import { AppActions, AppActionTypes } from '@app/actions/app/app.actions'

export interface AppState {
  questions: any
  user: any
}

export const initialAppState: AppState = {
  questions: {},
  user: null
}

export function appReducer(state = initialAppState, action: AppActions): AppState {
  switch (action.type) {

    case AppActionTypes.QuestionsLoaded:
      return {
        ...state,
        questions: action.payload
      }

    default:
      return state
  }
}
