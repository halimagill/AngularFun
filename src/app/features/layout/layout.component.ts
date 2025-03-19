import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'standardlayout',
  imports: [RouterLink],
  providers: [AuthenticationService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.less'
})
export class LayoutComponent {
  _authService: AuthenticationService;
  constructor(authService: AuthenticationService, private router: Router) {
    this._authService = authService;
  }

  logout() {
    debugger;
    console.log('Logging out');
    this._authService.logout();
    this.router.navigateByUrl('/login');
    console.log('Logged out');
  }
}
