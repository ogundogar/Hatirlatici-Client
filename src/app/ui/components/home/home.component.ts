import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/toastr/custom-toastr.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BaseComponent {
	constructor(spinner: NgxSpinnerService){
		super(spinner);
	}
	ngOnInit(): void {
		//this.showSpinner(SpinnerType.LineSpinFade)
	}
}
