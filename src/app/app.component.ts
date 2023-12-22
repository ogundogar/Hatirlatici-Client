import { Component } from '@angular/core';
import { AuthService } from './services/common/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	constructor(public authService:AuthService,private router:Router){
		authService.identityCheck();
	}
	signOut(){
		localStorage.removeItem("accessToken");
		this.authService.identityCheck();
		this.router.navigate([""]);
		window.location.reload();
	}
}
