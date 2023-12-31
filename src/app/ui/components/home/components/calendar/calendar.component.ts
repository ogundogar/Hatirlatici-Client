import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
	public days		:string[]=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
	public year		:number=new Date().getFullYear()+1;
	public today	:number=new Date().getDate();
	public thisMonth:number=1;
	public box		:number[][]=[[],[],[],[],[]]
	gecic:number=0;
	
	//month = [
	//[...Array(month_.January).keys()].map(num => num + 1),
	//[...Array(month_.February).keys()].map(num => num + 1),
	//[...Array(month_.March).keys()].map(num => num + 1),
	//[...Array(month_.April).keys()].map(num => num + 1),
	//[...Array(month_.May).keys()].map(num => num + 1),
	//[...Array(month_.June).keys()].map(num => num + 1),
	//[...Array(month_.July).keys()].map(num => num + 1),
	//[...Array(month_.August).keys()].map(num => num + 1),
	//[...Array(month_.September).keys()].map(num => num + 1),
	//[...Array(month_.October).keys()].map(num => num + 1),
	//[...Array(month_.November).keys()].map(num => num + 1),
	//[...Array(month_.December).keys()].map(num => num + 1)
	//];

	constructor(){
	}
	
	ngOnInit(): void { 
		this.calendar(this.thisMonth);
	}
	nextYear(){
		this.thisMonth=this.thisMonth+1;
		let month=this.months(this.thisMonth);
		let sayac=0
		let first:boolean=true;
		const deneme=month+this.gecic;
		for(let i = 0; i<this.box.length;i++){
			for(let j=0; j<7;j++){
				sayac++;
				if(sayac<deneme+1){
					if(this.gecic!=0 && i==0){
						this.box[0][j]=this.box[4][j]
					}else
					this.box[i][j]=sayac-this.gecic;
				}
				else{
					if(first){
						this.gecic=j;
						first=false;
					}
					this.box[i][j]=sayac-(deneme);
					console.log(this.box[i][j]);
				}
			}
		}
		if(first){
			this.gecic=0;
			first=false
		}
		console.log(this.box)
	}
	
	calendar(_thisMonth:number){

		let month=this.months(_thisMonth);
		let sayac=0
		let first:boolean=true;
		for(let i = 0; i<this.box.length;i++){
			for(let j=0; j<7;j++){
				sayac++;
				if(sayac<month+1)
				this.box[i][j]=sayac;
				else{
					if(first){
						this.gecic=j;
						first=false;
					}
					this.box[i][j]=sayac-month;
				}
			}
		}
		if(first){
			this.gecic=0;
			first=false
		}
		console.log(this.box);
	}
	months(_thisMonth:number){
		let month=0;
		switch(_thisMonth){
			case 1:
				month=31;
			break;
			case 2:
			
				if((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0)
				{month=29;}
				else
				{month=28;}
			break;
			case 3:
				month=31;
			break;
			case 4:
				month=30;
			break;
			case 5:
				month=31;
			break;
			case 6:
				month=30;
			break;
			case 7:
				month=31;
			break;
			case 8:
				month=31;
			break;
			case 9:
				month=30;
			break;
			case 10:
				month=31;
			break;
			case 11:
				month=30;
			break;
			case 12:
				month=31;
			break;
		}
		return month;
	}
}
export enum month_{
	January 	=31,
	February 	=28,
	March 		=31,
	April 		=30,
	May 		=31,
	June 		=30,
	July 		=31,
	August 		=31,
	September	=30,
	October 	=31,
	November 	=30,
	December 	=31
}
