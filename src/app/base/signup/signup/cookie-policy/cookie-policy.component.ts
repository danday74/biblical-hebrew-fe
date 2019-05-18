import { Component, EventEmitter, Output } from '@angular/core'

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.component.html',
  styleUrls: ['./cookie-policy.component.scss']
})

export class CookiePolicyComponent {

  @Output() readonly back = new EventEmitter<boolean>()

  onBack() {
    this.back.emit(true)
  }
}
