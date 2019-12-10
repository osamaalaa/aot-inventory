import { Component, OnInit } from '@angular/core'
import { StatisticsService } from '../../../services/statistics.service';
import { UIService } from '../../../services/ui.service';
declare var require: any
const data: any = require('../data.json')

@Component({
  selector: 'app-master-setup',
  templateUrl: './master-setup.component.html',
  styleUrls: ['./master-setup.component.scss'],
})
export class MasterSetupComponent implements OnInit {
  setupData = data.setupData
  progressCardsData = data.progressCardsData

  constructor() { }

  ngOnInit() {
  }

}
