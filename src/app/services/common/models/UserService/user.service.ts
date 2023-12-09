import { Injectable } from '@angular/core';
import { HttpClientService } from '../../HttpClient/http-client.service';
import { Create_User } from 'src/app/contracts/Create_User';
import { List_User } from 'src/app/contracts/List_User';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService:HttpClientService) { }

  create(user:Create_User,successCallBack?:()=>void,errorCallBack?:(errorMessage)=>void){
	this.httpClientService.post({
		controller:"Users"
	},user).subscribe(result=>
		{
		successCallBack();
	},(errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }
  
  async read(page:number=0,size:number=5,successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,users:List_User[]}> {
	const PromiseData:Promise<{totalCount:number,users:List_User[]}>=lastValueFrom(this.httpClientService.get<{totalCount:number,users:List_User[]}>({controller:"Users", queryString:`page=${page}&size=${size}`}));
	
	PromiseData.then(d=>successCallBack())
	.catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))
	return await PromiseData;
  }

 async delete(id:number){
	const deleteObservable:Observable<any>=this.httpClientService.delete<any>({
		controller:"Users"
	},id);
	await firstValueFrom(deleteObservable);
  }
}
