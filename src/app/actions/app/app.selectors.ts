import { createFeatureSelector, createSelector } from '@ngrx/store'
import { AppState } from '@app/reducers/app/app.reducer'

const selectAppState = createFeatureSelector<AppState>('app')

export const selectUser = createSelector(
  selectAppState,
  (appState) => appState.user
)
