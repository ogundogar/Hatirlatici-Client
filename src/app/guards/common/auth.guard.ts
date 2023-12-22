import { CanActivateFn } from '@angular/router';
import { _isAuthenticated } from 'src/app/services/common/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
	if(_isAuthenticated){
		return true;
	}
	return false;
};
