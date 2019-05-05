import { UiState } from '@app/reducers/ui/ui.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store'

const selectUiState = createFeatureSelector<UiState>('ui')

export const selectKeyboardOpen = createSelector(
  selectUiState,
  uiState => uiState.keyboardOpen
)
