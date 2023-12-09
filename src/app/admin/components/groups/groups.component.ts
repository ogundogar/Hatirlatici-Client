import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent extends BaseComponent{
	constructor(spinner: NgxSpinnerService){
		super(spinner);
	}
		ngOnInit(): void {
			//this.showSpinner(SpinnerType.Cog);
		}
}
