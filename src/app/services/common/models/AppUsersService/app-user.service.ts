import { Injectable } from '@angular/core';
import { HttpClientService } from '../../HttpClient/http-client.service';
import { entityUser } from 'src/app/entities/entityUser';
import { CreateAppUser } from 'src/app/contracts/AppUsers/createAppUser';
import { Observable, firstValueFrom } from 'rxjs';
import { CustomToastrService, } from 'src/app/services/ui/toastr/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
	constructor(private httpClientService:HttpClientService,
				private toastrService:CustomToastrService) 
		{ 

		}
	
	async create(user:entityUser,callBackFunction?:()=>void) : Promise<CreateAppUser>{
	const observable:Observable<CreateAppUser|entityUser> = this.httpClientService.post<CreateAppUser|entityUser>({controller:"AppUsers"},user);
	callBackFunction();
	return await firstValueFrom(observable) as CreateAppUser;
	}
}
