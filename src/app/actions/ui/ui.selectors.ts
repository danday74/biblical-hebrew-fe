import { UiState } from '@app/reducers/ui/ui.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store'

const selectUiState = createFeatureSelector<UiState>('ui')

export const selectInputBlur = createSelector(
  selectUiState,
  uiState => uiState.inputBlur
)

export const selectInputHasFocus = createSelector(
  selectUiState,
  uiState => uiState.inputHasFocus
)

export const selectKeyboardOpen = createSelector(
  selectUiState,
  uiState => uiState.keyboardOpen
)
