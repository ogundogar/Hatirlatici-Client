import { Component, EventEmitter, Output } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/Create_User';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify/alertify.service';
import { UserService } from 'src/app/services/common/models/UserService/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent extends BaseComponent{
constructor(
	spinner: NgxSpinnerService,
	private UserService:UserService,
	private alertify:AlertifyService,
	private dateAdapter: DateAdapter<Date>
	){
	super(spinner);
	this.dateAdapter.setLocale('en-GB');
}
@Output() createdUser :EventEmitter <Create_User>=new EventEmitter();

create(name:HTMLInputElement,email:HTMLInputElement,password:HTMLInputElement,date:HTMLInputElement){
	this.showSpinner(SpinnerType.Cog);
const createUser:Create_User=new Create_User();
createUser.UserName=name.value;
createUser.Email=email.value;
createUser.Password=password.value;
createUser.DateOfBrith=date.value;

this.UserService.create(createUser,()=>{
	this.hideSpinner(SpinnerType.Cog);
	this.alertify.message("Gönderme işlemi başarılı bir şekilde tamamlanmıştır.",{messageType:MessageType.success,position:PositionType.TopRight});
	this.createdUser.emit(createUser);
},errorMessage  =>{
	this.hideSpinner(SpinnerType.Cog);
	this.alertify.message(errorMessage ,{messageType:MessageType.error,position:PositionType.TopRight,dissmissOthers:true});
});
}}
