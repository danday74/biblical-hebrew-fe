import { ActionsLookup } from '@app/actions/actions-lookup'
import { CustomAction } from '@app/actions/custom-action'
import { environment } from '@environments/environment'
import { Action } from '@ngrx/store'
import * as Bowser from 'bowser'
import { forOwn } from 'lodash'

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
  const browser: { browser: any, engine: any, os: any, platform: any } = Bowser.parse(window.navigator.userAgent)
  browser.browser.slug = slugify(browser.browser.name, {lower: true})
  return browser
}

export const getRandomItemFromArray = (array: Array<any>) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const hasHebrewCharsOnly = str => {
  return str && RegExp('^[\u0590-\u05FF]+$').test(str)
}

export const getDir = str => {
  return hasHebrewCharsOnly(str) ? 'rtl' : 'ltr'
}
