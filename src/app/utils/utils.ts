import { Action } from '@ngrx/store'
import { environment } from '@environments/environment'
import { ActionsLookup } from '@app/actions/actions-lookup'
import { CustomAction } from '@app/actions/custom-action'

declare var replaceLast: (str, pattern, replacement) => string

export const getActionHttpPath = (action: CustomAction) => {
  let httpPath = action.type.replace(/\[/g, '').replace(/]/g, '')
    .replace(/ /g, '-').toLowerCase()
  if (action.payload) httpPath = `${httpPath}/${action.payload}`
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
