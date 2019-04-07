import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UsersState } from '@app/reducers/users/users.reducer'

const selectUsersState = createFeatureSelector<UsersState>('users')

export const selectUser = createSelector(
  selectUsersState,
  usersState => usersState.user
)

export const selectUserExists = createSelector(
  selectUsersState,
  usersState => usersState.userExists
)

export const selectLastUserLoggedIn = createSelector(
  selectUsersState,
  usersState => usersState.lastUserLoggedIn
)
