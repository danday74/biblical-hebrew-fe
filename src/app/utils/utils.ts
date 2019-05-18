import { ActionsLookup } from '@app/actions/actions-lookup'
import { CustomAction } from '@app/actions/custom-action'
import { environment } from '@environments/environment'
import { Action } from '@ngrx/store'
import * as Bowser from 'bowser'
import { forOwn, uniq } from 'lodash'

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

export const hasHebrewCharsOnly = str => {
  return str && RegExp('^[\u0590-\u05FF]+$').test(str)
}

export const getDir = str => {
  return hasHebrewCharsOnly(str) ? 'rtl' : 'ltr'
}

export const getRandomItemFromArray = (array: Array<any>) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const asNumber = str => {
  const num = str * 1
  return isNaN(num) ? str : num
}

export const isInteger = str => {
  return /^\d+$/.test(str)
}

export const splitAtIndex = (str: string, idx: number) => {
  const part1 = str.substring(0, idx)
  const part2 = str.substring(idx)
  return [part1, part2]
}

export const splitAtIndices = (str: string, indices: number[]) => {
  indices = uniq(indices.sort())
  let prevIdx = 0
  indices = indices.map(idx => {
    idx = idx - prevIdx
    prevIdx = idx
    return idx
  })
  const parts = []
  indices.forEach(idx => {
    const temp = splitAtIndex(str, idx)
    parts.push(temp[0])
    str = temp[1]
  })
  parts.push(str)
  return parts
}
