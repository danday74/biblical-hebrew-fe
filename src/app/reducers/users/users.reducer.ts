import { UsersActions, UsersActionTypes } from '@app/actions/users/users.actions'

export interface UsersState {
  user: any
  userExists: string
  lastUserLoggedIn: string
  signUpInProgress: boolean
}

export const initialUsersState: UsersState = {
  user: null,
  userExists: 'no',
  lastUserLoggedIn: null,
  signUpInProgress: false
}

export function usersReducer(state = initialUsersState, action: UsersActions): UsersState {
  switch (action.type) {

    case UsersActionTypes.SetUserExists:
      return {
        ...state,
        userExists: action.payload
      }

    case UsersActionTypes.LoginSuccess:
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

    case UsersActionTypes.SetLastUserLoggedIn:
      return {
        ...state,
        lastUserLoggedIn: action.payload
      }

    case UsersActionTypes.SetSignUpInProgress:
      return {
        ...state,
        signUpInProgress: action.payload
      }

    default:
      return state
  }
}
