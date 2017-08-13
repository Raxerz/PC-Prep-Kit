import { Component, Input } from '@angular/core';
import { SharedDataService } from '../services/shared.data.service';
import { Router } from '@angular/router';

@Component({
  	selector: 'button-nav',
    templateUrl: './button-nav.component.html',
    styleUrls: ['./button-nav.component.scss']
})
export class ButtonNavComponent {

	@Input() first: boolean;
	@Input() last: boolean;
  	@Input() complete: boolean;
  	@Input() nexturl: string;
  	@Input() prevurl: string;

  	public position: string;
    constructor(private _sharedData: SharedDataService, private _router: Router) {
            this._sharedData.position.subscribe(
            value => {
                this.position = value;
            }
        );
    }

    next() {
    	this._router.navigateByUrl(this.nexturl);
    }

    prev() {
    	this._router.navigateByUrl(this.prevurl);
    }
}

