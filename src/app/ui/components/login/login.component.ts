import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth/auth.service';
import { AuthLoginService } from 'src/app/services/common/models/AuthService/AuthLogin.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent {
	constructor(
		private authLoginService:AuthLoginService,
		spinner:NgxSpinnerService,
		private authService:AuthService,
		private router:Router, 
		private socialAuthService: SocialAuthService)
	{
	super(spinner);
	this.socialAuthService.authState.subscribe(async(user: SocialUser) => {
		console.log(user);
		this.showSpinner(SpinnerType.LineSpinFade)
		switch (user.provider){
			case "GOOGLE":
				await authLoginService.googleLogin(user,()=>{
					this.authService.identityCheck();
					this.router.navigate([""]);
					this.hideSpinner(SpinnerType.LineSpinFade);})
					break;
		}
	  });
	}
	async login(userNameOrEmail:string,password:string){
		this.showSpinner(SpinnerType.LineSpinFade);
		await this.authLoginService.login(userNameOrEmail,password,()=>{
		this.authService.identityCheck();
		this.router.navigate(["home"]);
		this.hideSpinner(SpinnerType.LineSpinFade);
		});
	}
}
