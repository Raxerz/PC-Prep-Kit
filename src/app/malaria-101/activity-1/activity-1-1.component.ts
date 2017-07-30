import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { SharedDataService } from '../../services/shared.data.service';

@Component({
  selector: 'app-activity-1-1',
  templateUrl: './activity-1-1.component.html',
  styleUrls: ['../malaria-101.component.scss']
})
export class AnimatedVideo implements OnInit {

	public position: string;

	constructor(private _dashboardService: DashboardService, private _sharedData: SharedDataService) { 
		this._sharedData.position.subscribe(
            value => {
                this.position = value;
            }
        ); 
	}

	ngOnInit() {
  	}

}
