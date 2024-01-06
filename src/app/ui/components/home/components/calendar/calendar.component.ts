import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { ReminderDiaologComponent } from 'src/app/dialogs/ReminderDialog/reminder-diaolog/reminder-diaolog.component';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ReminderService } from 'src/app/services/common/models/ReminderService/reminder.service';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
	constructor(private dialogService:DialogService,private reminderService:ReminderService){}
	eventsReminder:any[]=[];
	
	calendarOptions: CalendarOptions = {
		plugins: [dayGridPlugin,interactionPlugin],
		events: [],
		eventClick:this.handleEventClick.bind(this),
		dateClick: this.handleDateClick.bind(this),
		stickyHeaderDates:true,
		headerToolbar:{
			start: '',
			center: 'title',
			end: 'today prevYear,prev,next,nextYear'
		  },
		titleFormat:{year: 'numeric', month: 'numeric'},
		
	  };
	
	  handleDateClick(arg: DateClickArg) {

		const tarih = new Date(arg.dateStr);
		const year = tarih.getFullYear();
		const month = tarih.getMonth() + 1; 
		const day = tarih.getDate();
		this.openReminder(day,month,year)
	  }
	  handleEventClick(arg:any){
		console.log(arg.event._def.title)
		console.log(arg.event._def.extendedProps.Id)
		console.log(arg.event._instance.range.start)
	}

	async ngOnInit(){
		await this.getAllReminder();
		this.calendarOptions.events = this.eventsReminder;
	}
	
	async getAllReminder(){
		const reminders:any[]=await this.reminderService.getAll();
		
		this.eventsReminder=reminders.map((event)=>{return{
			Id:event.id,
			title:event.name,
			date:event.date.split('T')[0],
		}});
	}
	
	openReminder(day:number,month:number,year:number){
		this.dialogService.openDialog({
		componentType:ReminderDiaologComponent,
		data:{day:day,month:month,year:year},
		options:{
			width:"500px"
		},
		afterClosed:(async ()=>{
			console.log("Tamam")
		})
	});
	}

}
