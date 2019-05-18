// decorated method must be pure when not applied to a getter

import { get } from 'lodash'
import * as memoizee from 'memoizee'

// noinspection JSUnusedGlobalSymbols
const options = {
  normalizer(args) {
    return args[0]
  }
}

const memoizedFuncs = {}

export const memoize = (props: string[] = []): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    props = props.map(prop => prop.replace(/^this\./, ''))
    if ('value' in descriptor) {
      const valueFunc = descriptor.value
      descriptor.value = memoizee(valueFunc)
    } else if ('get' in descriptor) {
      const getFunc = descriptor.get
      memoizedFuncs[propertyKey] = memoizee((args: string[], that) => {
        const func = getFunc.bind(that)
        return func()
      }, options)
      descriptor.get = function() {
        const args: string[] = props.map(prop => get(this, prop))
        return memoizedFuncs[propertyKey](args, this)
      }
    }
    return descriptor
  }
}
