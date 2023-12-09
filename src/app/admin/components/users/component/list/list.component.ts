import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, _MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/common/models/UserService/user.service';
import { List_User } from 'src/app/contracts/List_User';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify/alertify.service';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';

declare var $ : any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseComponent {
	constructor(
		spinner: NgxSpinnerService,
		private alertify:AlertifyService,
		private UserService:UserService
		){
			super(spinner);
		}
	
	displayedColumns: string[] = ['UserName', 'Email', 'Password','DateOfBrith','CreateDate','UpdateDate','edit','delete'];
	dataSource:MatTableDataSource<List_User>=null;
		
	@ViewChild(MatPaginator) paginator: MatPaginator;
	async getUsers(){
		this.showSpinner(SpinnerType.Cog)
		const allUsers:{totalCount:number,users:List_User[]} = await this.UserService.read(
			this.paginator?this.paginator.pageIndex:0,this.paginator?this.paginator.pageSize:5,
			()=>{this.hideSpinner(SpinnerType.Cog);},
			()=>{this.hideSpinner(SpinnerType.Cog);
				this.alertify.message("Hata oluştu...",{messageType:MessageType.error,position:PositionType.TopRight,delay:1000,dissmissOthers:true});}
			);
			this.dataSource=new MatTableDataSource<List_User>(allUsers.users);
			this.paginator.length=allUsers.totalCount;
	}
	async ngOnInit() {
		this.getUsers();
	}
	
	async pageChanged(){
		await this.getUsers();
	}

}
