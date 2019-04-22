import { InitActionTypes } from '@app/actions/init/init.actions'
import { environment } from '@environments/environment'
import { routerReducer } from '@ngrx/router-store'
import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import * as Debug from 'debug'
import { storeFreeze } from 'ngrx-store-freeze'
import { initialQuestionsState, questionsReducer, QuestionsState } from './questions/questions.reducer'
import { initialUsersState, usersReducer, UsersState } from './users/users.reducer'

const debug = Debug('bh:logger')

export interface State {
  questions: QuestionsState
  users: UsersState
  router: any
}

export const reducers: ActionReducerMap<State> = {
  questions: questionsReducer,
  users: usersReducer,
  router: routerReducer
}

export const logger = reducer => {
  const MAX_LENGTH = 100000
  return (state, action) => {
    if (!action.type.startsWith('@ngrx/router-store')) {
      let strAction = `type: ${action.type}`
      if (action.payload) {
        let strPayload = JSON.stringify(action.payload)
        if (strPayload.length > MAX_LENGTH) strPayload = action.payload.toString()
        strAction += `, payload: ${strPayload}`
      }
      debug(strAction)
    }
    return reducer(state, action)
  }
}

export const resetStore = reducer => {
  return (state, action) => {
    if (action.type !== InitActionTypes.ResetStore) {
      return reducer(state, action)
    } else {
      const resetState = {
        ...state,
        questions: initialQuestionsState,
        users: {
          ...initialUsersState,
          lastUserLoggedIn: state.users.lastUserLoggedIn,
          webkitAutofillUsed: state.users.webkitAutofillUsed,
          whoAmICheck: false
        }
      }
      return reducer(resetState, action)
    }
  }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [resetStore, logger, storeFreeze] : [resetStore]
