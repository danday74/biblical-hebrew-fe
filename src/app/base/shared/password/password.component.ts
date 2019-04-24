import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core'
import { ControlContainer, NgForm } from '@angular/forms'
import { faCheck, faEye, faTimes } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: NgForm}]
})

export class PasswordComponent implements OnInit {

  @ViewChild('passwordInput') passwordInput: ElementRef // this is used
  @Input() forceFailure = false
  @Input() hideFeedback = false
  @Input() newPassword = true
  @Output() readonly enterKeyPress = new EventEmitter<any>()
  @Output() readonly passwordChange = new EventEmitter<string>()

  faCheck = faCheck
  faTimes = faTimes
  faEye = faEye

  autocomplete: string
  password = ''
  pattern = '^[a-zA-Z0-9\u0590-\u05FF]+$'
  showPassword = false

  ngOnInit() {
    this.autocomplete = this.newPassword ? 'new-password' : 'on'
  }

  onEnter(evt) {
    this.enterKeyPress.emit(evt)
  }

  onPasswordChange(password) {
    this.password = password
    this.passwordChange.emit(password)
  }

  showPwd() {
    this.showPassword = true
  }

  noShowPwd() {
    this.showPassword = false
  }
}
