import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
constructor(private spinner:NgxSpinnerService){}
showSpinner(spinnerNameType:SpinnerType){
	this.spinner.show(spinnerNameType);
	//setTimeout(() => {this.spinner.hide(spinnerNameType);}, 5000);
}
hideSpinner(spinnerNameType:SpinnerType){
		this.spinner.hide(spinnerNameType);
}
}
export enum SpinnerType{
	Cog="s1",
	LineSpinFade="s2",
	BallScaleMultiple="s3",
	BallSpinClockwise="s4",
}
