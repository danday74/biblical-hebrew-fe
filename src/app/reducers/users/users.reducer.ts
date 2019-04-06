import { UsersActions, UsersActionTypes } from '@app/actions/users/users.actions'

export interface UsersState {
  user: any
  userExists: string
}

export const initialUsersState: UsersState = {
  user: null,
  userExists: 'no'
}

export function usersReducer(state = initialUsersState, action: UsersActions): UsersState {
  switch (action.type) {

    case UsersActionTypes.SetUserExists:
      return {
        ...state,
        userExists: action.payload
      }

    case UsersActionTypes.UserLoaded:
      return {
        ...state,
        user: action.payload
      }

    case UsersActionTypes.Logout:
      return {
        ...state,
        user: initialUsersState.user,
        userExists: initialUsersState.userExists
      }

    default:
      return state
  }
}
