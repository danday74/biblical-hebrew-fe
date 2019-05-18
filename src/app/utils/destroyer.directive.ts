import { Directive, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

@Directive({selector: '[appDestroyer]'})

export class DestroyerDirective implements OnDestroy {

  protected unsubscribe$ = new Subject()

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
