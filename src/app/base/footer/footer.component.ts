import { Component, OnInit } from '@angular/core'
import moment from 'moment'
import config from '../../../config'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

  app: any
  year: number

  ngOnInit() {
    this.app = config.app
    this.year = moment().year()
  }
}
