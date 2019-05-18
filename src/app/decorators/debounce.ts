import { debounce as lodashDebounce } from 'lodash'

export const debounce = (wait = 0, leading = false, trailing = true): MethodDecorator => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    if ('value' in descriptor) {
      const valueFunc = descriptor.value
      descriptor.value = lodashDebounce(valueFunc, wait, {leading, trailing})
    } else if ('get' in descriptor) {
      const getFunc = descriptor.get
      descriptor.get = lodashDebounce(getFunc, wait, {leading, trailing})
    }
    return descriptor
  }
}
