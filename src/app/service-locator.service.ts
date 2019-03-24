import { Injector } from '@angular/core'

export class ServiceLocator {
  static injector: Injector

  constructor(private injector: Injector) {
    ServiceLocator.injector = this.injector
  }
}
