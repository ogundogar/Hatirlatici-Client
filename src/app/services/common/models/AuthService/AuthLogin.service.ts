import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/Token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/toastr/custom-toastr.service';
import { HttpClientService } from '../../HttpClient/http-client.service';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

	constructor(private httpClientService:HttpClientService,
		private toastrService:CustomToastrService) { }
		
	async refreshTokenLogin(refreshToken:string, callbackFunction?:()=>void):Promise<any>{
		const observable:Observable<any|TokenResponse>=this.httpClientService.post({
			action:"RefreshTokenLogin",
			controller:"Auth",
		},{refreshToken:refreshToken});

		const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
		debugger
		if(!tokenResponse){
			localStorage.setItem("accessToken",tokenResponse.token.accessToken);
			localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
			this.toastrService.message("RefreshToken devreye girdi...","Refresh Token",{
				MessageType:ToastrMessageType.Success,
				position:ToastrPositionType.TopLeft
			})
		}
		callbackFunction();

	}

	async login(userNameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<void>{
		const observable:Observable<any>=this.httpClientService.post<any|TokenResponse>({
			controller:"Auth",
			action:"login"
		},{userNameOrEmail,password});
		const tokenResponse:TokenResponse = await firstValueFrom(observable) as TokenResponse;
		if(tokenResponse){
			localStorage.setItem("accessToken",tokenResponse.token.accessToken);
			localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
			this.toastrService.message("Başarılı bir şekilde giriş yapıldı.","Giriş Yapıldı",{
				MessageType:ToastrMessageType.Success,
				position:ToastrPositionType.TopLeft
			})
		}
		callBackFunction();
	}

	async googleLogin(user:SocialUser,callBackFunction?:()=>void):Promise<any>{
		const observable:Observable<SocialUser|TokenResponse>=this.httpClientService.post<SocialUser|TokenResponse>({
			action:"google-login",
			controller:"Auth"
		},user);
		const tokenResponse:TokenResponse = await firstValueFrom(observable) as TokenResponse;
		if(tokenResponse)
		{
		localStorage.setItem("accessToken",tokenResponse.token.accessToken);
		localStorage.setItem("refreshToken",tokenResponse.token.refreshToken);
		this.toastrService.message("Başarılı bir şekilde giriş yapıldı.","Giriş Yapıldı",{
		MessageType:ToastrMessageType.Success,
		position:ToastrPositionType.TopRight
		});
		callBackFunction();
		}
	}
}
