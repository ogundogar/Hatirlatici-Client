import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateAppUser } from 'src/app/contracts/AppUsers/createAppUser';
import { entityUser } from 'src/app/entities/entityUser';
import { AppUserService } from 'src/app/services/common/models/AppUsersService/app-user.service';
import { CustomToastrService, ToastrMessageType, ToastrPositionType } from 'src/app/services/ui/toastr/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends BaseComponent {
	frm:FormGroup;
	constructor(private formBuilder:FormBuilder, private cToastr:CustomToastrService,private appUserService:AppUserService, spinner:NgxSpinnerService){
		super(spinner);
		this.frm=this.formBuilder.group({
			userName:["",[
				Validators.required,
				Validators.maxLength(50),
				Validators.minLength(2),
			]],
			email:["",[
				Validators.required,
				Validators.maxLength(100),
				Validators.email,
			]],
			birthday:["",[
				Validators.required,
			]],
			password:["",[
				Validators.required,
			]],
			confirmPassword:["",[
				Validators.required,
			]],
		},{
			validators:(group:AbstractControl):ValidationErrors | null => {
				let password=group.get("password").value;
				let confirmPassword=group.get("confirmPassword").value;
				return password===confirmPassword? null:{notSame:true}
			}
		})
	}
	get component(){
		return this.frm.controls;
	}

	submitted:boolean=false;
	async onSubmit(data:entityUser){
		this.submitted=true;
		if(this.frm.invalid)
		{
			console.log(data);
			return;
		}
	const result:CreateAppUser=	await this.appUserService.create(data,()=>{this.hideSpinner(SpinnerType.LineSpinFade);})
		this.showSpinner(SpinnerType.LineSpinFade);
	if(result.succeeded){
			this.cToastr.message("Başarılı",result.message,{MessageType:ToastrMessageType.Success, position:ToastrPositionType.TopRight});
		}else{
			this.cToastr.message("Başarısız",result.message,{MessageType:ToastrMessageType.Error, position:ToastrPositionType.TopRight});
		}
		
	}
}
