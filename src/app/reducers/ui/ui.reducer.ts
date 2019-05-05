import { UiActions, UiActionTypes } from '@app/actions/ui/ui.actions'

export interface UiState {
  keyboardOpen: boolean
}

export const initialUiState: UiState = {
  keyboardOpen: false
}

export function uiReducer(state = initialUiState, action: UiActions): UiState {

  switch (action.type) {

    case UiActionTypes.SetKeyboardOpen:
      return {
        ...state,
        keyboardOpen: action.payload
      }

    default:
      return state
  }
}
