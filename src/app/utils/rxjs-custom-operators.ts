import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

// Prefix all operators with custom so it is clear which RxJs operators are custom and which are not

export const customLog = <T>(debug) => {
  return (source: Observable<T>) => source.pipe(
    tap(value => { debug(value) })
  )
}
