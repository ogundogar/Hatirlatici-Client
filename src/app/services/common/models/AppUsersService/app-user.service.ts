import { Injectable } from '@angular/core';
import { HttpClientService } from '../../HttpClient/http-client.service';
import { entityUser } from 'src/app/entities/entityUser';
import { CreateAppUser } from 'src/app/contracts/AppUsers/createAppUser';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppUserService {
	constructor(private httpClientService:HttpClientService) { }
	async create(user:entityUser,callBackFunction?:()=>void) : Promise<CreateAppUser>{
	const observable:Observable<CreateAppUser|entityUser> = this.httpClientService.post<CreateAppUser|entityUser>({controller:"AppUsers"},user);
	callBackFunction();
	return await firstValueFrom(observable) as CreateAppUser;
	}
}
