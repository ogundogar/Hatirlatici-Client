import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css']
})
export class ReminderComponent extends BaseComponent {
	constructor(spinner: NgxSpinnerService){
		super(spinner);
	}
	ngOnInit(): void {
		this.showSpinner(SpinnerType.LineSpinFade)
	}
}
