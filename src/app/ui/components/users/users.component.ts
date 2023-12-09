import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseComponent {
constructor(spinner: NgxSpinnerService){
	super(spinner);
}
ngOnInit(): void {
	this.showSpinner(SpinnerType.LineSpinFade)
}
}
