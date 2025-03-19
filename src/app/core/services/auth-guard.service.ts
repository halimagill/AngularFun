import { Inject ,Injectable} from '@angular/core';
import { CanActivate, createUrlTreeFromSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
 
  constructor(private router: Router, private authService :AuthenticationService, private platformService: PlatformService) 
  { 
  }
  
  canActivate(): boolean { 
    debugger;
    if (this.authService.isLoggedIn()) {
      // Redirect to login page or show an error message
      console.log('User is not logged in');
      return true;
    }

    if (this.platformService.isServer()) {
      return false;
    }

    //return createUrlTreeFromSnapshot(route, ['/', 'login']);

    this.router.navigate(['/login']);
    return false;   
  }
  
}
