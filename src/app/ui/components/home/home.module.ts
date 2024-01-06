import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatTreeModule} from '@angular/material/tree'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TreeComponent } from './components/tree/tree.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import {MatGridListModule} from '@angular/material/grid-list'; 
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
@NgModule({
  declarations: [
    HomeComponent,
	TreeComponent,
	CalendarComponent,
	
  ],
  imports: [
    CommonModule,
	RouterModule.forChild([{path:"",component:HomeComponent}]),
	MatSidenavModule,MatTreeModule,MatIconModule,MatButtonModule,MatGridListModule,
	FullCalendarModule
  ]
})
export class HomeModule { }
