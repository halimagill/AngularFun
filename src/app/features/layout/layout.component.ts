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
  protected authService: AuthenticationService;
  constructor(authService: AuthenticationService, private router: Router) {
    this.authService = authService;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
