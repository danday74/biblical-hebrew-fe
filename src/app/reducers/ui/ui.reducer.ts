import { UiActions, UiActionTypes } from '@app/actions/ui/ui.actions'

export interface UiState {
  inputBlur: {
    name: string,
    value: string,
    maxLength: number,
    selectionStart: number,
    selectionEnd: number,
    timestamp: number
  },
  inputHasFocus: boolean,
  keyboardOpen: boolean
}

export const initialUiState: UiState = {
  inputBlur: {
    name: null,
    value: null,
    maxLength: null,
    selectionStart: null,
    selectionEnd: null,
    timestamp: null
  },
  inputHasFocus: false,
  keyboardOpen: false
}

export const uiReducer = (state = initialUiState, action: UiActions): UiState => {

  switch (action.type) {

    case UiActionTypes.InputBlur:
      return {
        ...state,
        inputBlur: {
          ...action.payload,
          timestamp: Date.now()
        },
        inputHasFocus: false
      }

    case UiActionTypes.ClearInputBlur:
      return {
        ...state,
        inputBlur: initialUiState.inputBlur,
        inputHasFocus: true
      }

    case UiActionTypes.SetKeyboardOpen:
      return {
        ...state,
        keyboardOpen: action.payload
      }

    default:
      return state
  }
}
