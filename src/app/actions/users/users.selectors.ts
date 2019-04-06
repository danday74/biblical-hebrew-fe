import { createFeatureSelector, createSelector } from '@ngrx/store'
import { UsersState } from '@app/reducers/users/users.reducer'

const selectUsersState = createFeatureSelector<UsersState>('users')

export const selectUserExists = createSelector(
  selectUsersState,
  usersState => usersState.userExists
)

export const selectUser = createSelector(
  selectUsersState,
  usersState => usersState.user
)
