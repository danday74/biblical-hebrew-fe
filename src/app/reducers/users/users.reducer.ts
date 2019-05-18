import { UsersActions, UsersActionTypes } from '@app/actions/users/users.actions'

export interface UsersState {
  lastUserLoggedIn: string
  signUpInProgress: any
  user: any
  userExists: string
  webkitAutofillUsed: boolean
  whoAmICheck: boolean
}

export const initialUsersState: UsersState = {
  lastUserLoggedIn: null,
  signUpInProgress: null,
  user: null,
  userExists: 'no',
  webkitAutofillUsed: false,
  whoAmICheck: null
}

export const usersReducer = (state = initialUsersState, action: UsersActions): UsersState => {
  switch (action.type) {

    case UsersActionTypes.UserLoaded:
      return {
        ...state,
        user: action.payload,
        whoAmICheck: true
      }

    case UsersActionTypes.UserFailed:
    case UsersActionTypes.WhoAmIFailed:
      return {
        ...state,
        whoAmICheck: false
      }

    case UsersActionTypes.LoginSuccess:
      return {
        ...state,
        user: action.payload
      }

    case UsersActionTypes.SetUserExists:
      return {
        ...state,
        userExists: action.payload
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

    case UsersActionTypes.WebkitAutofillUsed:
      return {
        ...state,
        webkitAutofillUsed: true
      }

    default:
      return state
  }
}
