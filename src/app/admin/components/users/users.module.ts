import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './component/create/create.component';
import { ListComponent } from './component/list/list.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button'; 
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { DeleteDirective } from 'src/app/directive/admin/delete/delete.directive';
import { FileUploadModule } from 'src/app/services/common/file-upload/file-upload.module';
import { DialogsModule } from 'src/app/dialogs/dialogs.module';

@NgModule({
  declarations: [
    UsersComponent,
    CreateComponent,
    ListComponent,
	DeleteDirective,
  ],
  imports: [
    CommonModule,
	RouterModule.forChild([{path:"",component:UsersComponent}]),
	MatSidenavModule,MatFormFieldModule,MatInputModule,MatDatepickerModule,MatIconModule,MatNativeDateModule,MatButtonModule,MatTableModule,MatPaginatorModule,
	FileUploadModule,DialogsModule
  ],
  exports:[
	UsersComponent
  ]
})
export class UsersModule { }
