import { Action } from '@ngrx/store'
import { environment } from '@environments/environment'
import { ActionsLookup } from '@app/actions/actions-lookup'
import { CustomAction } from '@app/actions/custom-action'
import { forOwn } from 'lodash'

declare var replaceLast: (str, pattern, replacement) => string

export const getActionHttpPath = (action: CustomAction) => {
  let httpPath = action.type.replace(/\[/g, '').replace(/]/g, '')
    .replace(/ /g, '-').toLowerCase()
  if (action.payload) {
    if (typeof action.payload === 'string' || typeof action.payload === 'number') {
      httpPath = `${httpPath}/${action.payload}`
    } else if (typeof action.payload === 'object') {
      forOwn(action.payload, (v, k) => {
        httpPath = `${httpPath}/${k}/${v}`
      })
    }
  }
  return environment.httpPhp + '/' + httpPath
}

export const getLoadedAction = (action: Action) => {
  const key = replaceLast(action.type, 'Requested', 'Loaded')
  return ActionsLookup[key]
}

export const getFailedAction = (action: Action) => {
  const key = replaceLast(action.type, 'Requested', 'Failed')
  return ActionsLookup[key]
}
