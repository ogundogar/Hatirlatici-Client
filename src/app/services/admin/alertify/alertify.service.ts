import { Injectable } from '@angular/core';
declare var alertify:any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {
  constructor() { }
	message(message:string,options:Partial<AlertifyOptions>){
		alertify.set('notifier','position', options.position);
		alertify.set('notifier','delay',options.delay)
		const msj=alertify[options.messageType](message);
		if(options.dissmissOthers)
			msj.dissmissOthers();
	}
	dismissAll(){
		alertify.dismissAll();
	}
}
export class AlertifyOptions{
	messageType:MessageType;
	position:PositionType;
	delay:number;
	dissmissOthers:boolean;
}
export enum MessageType{
	error="error",
	message="message",
	notify="notify",
	success="success",
	warning="warning",
}
export enum PositionType{
	TopRight="top-right",
	TopCenter="top-center",
	TopLeft="top-left",
	BottomRight="bottom-right",
	BottomCenter="bottom-center",
	BottomLeft="bottom-left",
}
