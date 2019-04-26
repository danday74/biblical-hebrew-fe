import { Component, Input, OnChanges, OnDestroy } from '@angular/core'
import * as $ from 'jquery'
import { memoize } from 'lodash'

@Component({
  selector: 'app-bot-eyes',
  templateUrl: './bot-eyes.component.html',
  styleUrls: ['./bot-eyes.component.scss']
})

export class BotEyesComponent implements OnChanges, OnDestroy {

  @Input() captchaSuccess = false

  eyes = {
    left: {
      center: null,
      clickCount: 0,
      el: null,
      out: false
    },
    right: {
      center: null,
      clickCount: 0,
      el: null,
      out: false
    }
  }

  private botEyesDir = 'assets/images/bot/bot-eyes'
  private eyeOutTimer = 1000
  private maxEyeClickCount = 3
  private mouseX: number
  private mouseY: number

  constructor() {
    this.onMouseMove = this.onMouseMove.bind(this)
  }

  ngOnChanges() {
    this.reset()
    setTimeout(() => {
      this.initBotEyes()
    })
  }

  ngOnDestroy() {
    $(document).off('mousemove')
  }

  get leftEyeSrc() {
    const memo = memoize(leftEyeClickCount => {
      return leftEyeClickCount < this.maxEyeClickCount ? this.botEyesDir + '/bot-eye-tiny.png' : this.botEyesDir + '/bot-eye-black-tiny.png'
    })
    return memo(this.eyes.left.clickCount)
  }

  get leftEyeOrangeSrc() {
    const memo = memoize(leftEyeClickCount => {
      return leftEyeClickCount < this.maxEyeClickCount ? this.botEyesDir + '/bot-eye-orange-tiny.png' : this.botEyesDir + '/bot-eye-black-tiny.png'
    })
    return memo(this.eyes.left.clickCount)
  }

  get rightEyeSrc() {
    const memo = memoize(rightEyeClickCount => {
      return rightEyeClickCount < this.maxEyeClickCount ? this.botEyesDir + '/bot-eye-tiny.png' : this.botEyesDir + '/bot-eye-black-tiny.png'
    })
    return memo(this.eyes.right.clickCount)
  }

  get rightEyeOrangeSrc() {
    const memo = memoize(rightEyeClickCount => {
      return rightEyeClickCount < this.maxEyeClickCount ? this.botEyesDir + '/bot-eye-orange-tiny.png' : this.botEyesDir + '/bot-eye-black-tiny.png'
    })
    return memo(this.eyes.right.clickCount)
  }

  onLeftEyeClick() {
    this.onEyeClick(this.eyes.left)
  }

  onRightEyeClick() {
    this.onEyeClick(this.eyes.right)
  }

  private onEyeClick(eye) {
    if (!eye.out) {
      eye.out = true
      eye.clickCount++
      setTimeout(() => {
        if (eye.clickCount < this.maxEyeClickCount) eye.out = false
      }, this.eyeOutTimer)
    }
  }

  private reset() {
    this.eyes.left.clickCount = 0
    this.eyes.right.clickCount = 0
    this.eyes.left.out = false
    this.eyes.right.out = false
  }

  private initBotEyes() {
    this.eyes.left.el = $('.bot-eye.left')
    this.eyes.left.center =
      [this.eyes.left.el.offset().left + this.eyes.left.el.width() / 2, this.eyes.left.el.offset().top + this.eyes.left.el.height() / 2]

    this.eyes.right.el = $('.bot-eye.right')
    this.eyes.right.center =
      [this.eyes.right.el.offset().left + this.eyes.right.el.width() / 2, this.eyes.right.el.offset().top + this.eyes.right.el.height() / 2]

    $(document).off('mousemove')
    $(document).on('mousemove', this.onMouseMove)
    this.onMouseMove()
  }

  private onMouseMove(evt = null) {
    this.mouseX = evt ? evt.pageX : this.mouseX
    this.mouseY = evt ? evt.pageY : this.mouseY

    const eyeLeftAngle = (Math.atan2(this.mouseX - this.eyes.left.center[0], -(this.mouseY - this.eyes.left.center[1])) * (180 / Math.PI)) + 45
    const strEyeLeftAngle = `rotate(${eyeLeftAngle}deg)`
    const eyeRightAngle = (Math.atan2(this.mouseX - this.eyes.right.center[0], -(this.mouseY - this.eyes.right.center[1])) * (180 / Math.PI)) + 45
    const strEyeRightAngle = `rotate(${eyeRightAngle}deg)`

    this.eyes.left.el.css({transform: strEyeLeftAngle})
    this.eyes.right.el.css({transform: strEyeRightAngle})
  }
}
