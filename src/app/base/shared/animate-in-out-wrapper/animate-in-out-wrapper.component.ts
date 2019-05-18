import { Component, Input, OnInit } from '@angular/core'
import { getRandomItemFromArray } from '@app/utils/utils'
import config from '../../../app.config'

@Component({
  selector: 'app-animate-in-out-wrapper',
  templateUrl: './animate-in-out-wrapper.component.html',
  styleUrls: ['./animate-in-out-wrapper.component.scss']
})

export class AnimateInOutWrapperComponent implements OnInit {

  @Input() animateNow = false

  randomAnimation: string

  ngOnInit() {
    this.randomAnimation = getRandomItemFromArray(config.loginAnimations)
  }
}
