import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core'
import { SetKeyboardOpenAction } from '@app/actions/ui/ui.actions'
import { State } from '@app/reducers'
import { StorageService } from '@app/services/storage/storage.service'
import { faWindowClose, faWindowMinimize } from '@fortawesome/free-solid-svg-icons'
import { Store } from '@ngrx/store'
import { debounce } from 'lodash'

const keyboardHasBeenDraggedKey = 'keyboardHasBeenDragged'

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})

export class KeyboardComponent implements OnInit {

  @Input() bounds: ElementRef
  @ViewChild('block') block: any

  faWindowClose = faWindowClose
  faWindowMinimize = faWindowMinimize

  hasBeenDragged: boolean
  hasMoved = false

  constructor(private storageService: StorageService, private store: Store<State>) {
    this.resetPosition = debounce(this.resetPosition, 300, {leading: false, trailing: true})
  }

  ngOnInit() {
    this.hasBeenDragged = this.storageService.getLocalStorage(keyboardHasBeenDraggedKey)
  }

  @HostListener('window:resize')
  onResize() {
    this.resetPosition()
  }

  onMinimise() {
    this.resetPosition()
  }

  onCloseKeyboard() {
    this.store.dispatch(new SetKeyboardOpenAction(false))
  }

  onEndOffset(offset) {
    this.hasMoved = offset.x || offset.y
    if (!this.hasBeenDragged) {
      this.hasBeenDragged = true
      this.storageService.setLocalStorage(keyboardHasBeenDraggedKey, true)
    }
  }

  private resetPosition() {
    this.block.resetPosition()
    this.hasMoved = false
  }
}
