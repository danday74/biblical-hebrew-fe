import { UsersState } from '@app/reducers/users/users.reducer'
import { createFeatureSelector, createSelector } from '@ngrx/store'

const selectUsersState = createFeatureSelector<UsersState>('users')

export const selectLastUserLoggedIn = createSelector(
  selectUsersState,
  usersState => usersState.lastUserLoggedIn
)

export const selectSignUpInProgress = createSelector(
  selectUsersState,
  usersState => usersState.signUpInProgress
)

export const selectUser = createSelector(
  selectUsersState,
  usersState => usersState.user
)

// selectUserExists listen to action

export const selectWebkitAutofillUsed = createSelector(
  selectUsersState,
  usersState => usersState.webkitAutofillUsed
)

export const selectWhoAmICheck = createSelector(
  selectUsersState,
  usersState => usersState.whoAmICheck
)
