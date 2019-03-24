import { Action } from '@ngrx/store'
import { environment } from '@environments/environment'
import { ActionsLookup } from '@app/actions/actions-lookup'

declare var replaceLast: (str, pattern, replacement) => string

export const getActionHttpPath = (action: Action) => {
  const httpPath = action.type.replace(/\[/g, '').replace(/]/g, '')
    .replace(/ /g, '-').toLowerCase()
  return environment.httpPhp + '/' + httpPath
}

export const getLoadedAction = (action: Action) => {
  const key = replaceLast(action.type, 'Requested', 'Loaded')
  return ActionsLookup[key]
}
