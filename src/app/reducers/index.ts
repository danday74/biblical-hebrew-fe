import { ActionReducerMap, MetaReducer } from '@ngrx/store'
import { environment } from '@environments/environment'
import { appReducer, AppState } from './app/app.reducer'
import { storeFreeze } from 'ngrx-store-freeze'
import * as Debug from 'debug'

const debug = Debug('bh:logger')

export interface State {
  app: AppState
}

export const reducers: ActionReducerMap<State> = {
  app: appReducer
}

export function logger(reducer) {
  const MAX_LENGTH = 100000
  return (state, action) => {
    let strAction = `type: ${action.type}`
    if (action.payload) {
      let strPayload = JSON.stringify(action.payload)
      if (strPayload.length > MAX_LENGTH) strPayload = action.payload.toString()
      strAction += `, payload: ${strPayload}`
    }
    debug(strAction)
    return reducer(state, action)
  }
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger, storeFreeze] : []
