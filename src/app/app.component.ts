import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
//import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet],
  styleUrl: './app.component.less'
})
export class AppComponent {
  title = 'LoginExample';
  constructor() {
    console.log(environment.production); // Logs false for development environment
  }
 // constructor(public authService: AuthenticationService) {}
}
