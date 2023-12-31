import { Component, Output, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/Create_User';
import { ListComponent } from './component/list/list.component';
import { FileUploadOptions } from 'src/app/services/common/file-upload/component/file-upload/file-upload.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent extends BaseComponent{

@ViewChild(ListComponent) ListComponent:ListComponent
createdUser(createdUser:Create_User) {
	this.ListComponent.getUsers();
}

constructor(spinner: NgxSpinnerService){
	super(spinner);
}

}
