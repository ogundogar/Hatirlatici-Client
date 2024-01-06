import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { ReminderByDate } from 'src/app/contracts/Reminder/ReminderByDate';
import { HttpClientService } from '../../HttpClient/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReminderService {

  constructor(private httpClientService:HttpClientService,) { }

	async getAll(successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void) {
		const PromiseData=lastValueFrom(this.httpClientService.get<ReminderByDate[]>({controller:"Reminder"}));
		return await PromiseData;
	}

	async getByDate(day:number,month:number,year:number,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{reminder:ReminderByDate[]}> {
	const PromiseData:Promise<{reminder:ReminderByDate[]}>=
	lastValueFrom(this.httpClientService.get<{reminder:ReminderByDate[]}>({
	controller:"Reminder",
	action:"GetReminderDate",
	queryString:`date=${year}-${month}-${day}`}));

	PromiseData.then(d=>successCallBack())
	.catch((errorResponse:HttpErrorResponse)=>{
		console.log("getByDate Reminder Hata")
		errorCallBack(errorResponse.message)})
	return await PromiseData;
	}

	async post(reminderData:ReminderByDate,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void){
		this.httpClientService.post({
			controller:"Reminder"
		},reminderData).subscribe(result=>{ 
			successCallBack(),
			(errorResponse:HttpErrorResponse)=>{
				console.log("post Reminder Hata")
			errorCallBack(errorResponse.message);
			}
	})
	}

	async delete(id:number){
		const deleteObservable:Observable<any>=this.httpClientService.delete<any>({
			controller:"Reminder"
		},id);
		await firstValueFrom(deleteObservable);
	  }
			
		
	
}
