import { AppActions, AppActionTypes } from '@app/actions/app/app.actions'

export interface AppState {
  questions: any
  user: any
  userExists: string
}

export const initialAppState: AppState = {
  questions: {},
  user: null,
  userExists: 'no'
}

export function appReducer(state = initialAppState, action: AppActions): AppState {
  switch (action.type) {

    case AppActionTypes.QuestionsLoaded:
      return {
        ...state,
        questions: action.payload
      }

    case AppActionTypes.UserExistsUpdated:
      return {
        ...state,
        userExists: action.payload
      }

    default:
      return state
  }
}
