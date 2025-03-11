import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthenticationService } from '../../core/services/authentication.service';

@Component({
  selector: 'standardlayout',
  imports: [RouterOutlet],
  providers: [AuthenticationService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.less'
})
export class LayoutComponent {
  protected authService: AuthenticationService;
  constructor(authService: AuthenticationService) {
    this.authService = authService;
  }
}
