import { ActionsLookup } from '@app/actions/actions-lookup'
import { CustomAction } from '@app/actions/custom-action'
import { environment } from '@environments/environment'
import { Action } from '@ngrx/store'
import * as Bowser from 'bowser'
import { cloneDeep, forOwn } from 'lodash'

declare var replaceLast: (str, pattern, replacement) => string
declare var slugify: (str, options) => any

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

export const getBrowser = () => {
  const bro = Bowser.getParser(window.navigator.userAgent)
  const browser = cloneDeep(bro.getBrowser())
  browser.slug = slugify(browser.name, {lower: true})
  return browser
}

export const getRandomItemFromArray = (array: Array<any>) => {
  return array[Math.floor(Math.random() * array.length)]
}
