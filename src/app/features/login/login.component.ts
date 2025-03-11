import { Component,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../core/services/authentication.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debug } from 'console';

@Component({ 
  selector: 'mainlogin',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [AuthenticationService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent {
  loginForm: FormGroup;
  isInvalidLogin: boolean = false;
  private _isUserLoggedIn$ = new BehaviorSubject<boolean>(false); 
  public isLoggedIn$ = this._isUserLoggedIn$.asObservable();

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private router: Router) {

                this.loginForm = this.fb.group({
                  email: new FormControl('', [Validators.required, Validators.email]),
                  password: new FormControl('', Validators.required),
                });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  goToCreateLogin() {
    debugger;
    this.router.navigateByUrl('/create-login');
  }

  login() {
    debugger;
    const val = this.loginForm.value;
    console.log(this.loginForm.value);

    this.authService.login(val.email, val.password)
    .subscribe({
      next: (token: any) => {
        debugger;       
        console.log(token); 
            
        if (this.isUserLogin(token)) {
          // const loginInfo: LoginInfo = response.data as LoginInfo;
          // this.userInfo = loginInfo;
          this._isUserLoggedIn$.next(true);
          localStorage.setItem('token', token);                    

          this.router.navigateByUrl('/dashboard');
          console.log("User is logged in");     
          // Use the user object here
        }
      },
      error: (error) => {
        debugger;
        // Handle the rethrown error
        console.error('Error caught in component:', error);
        this.isInvalidLogin = true;
      },
    });   
  }

  // Handle the response here
  isUserLogin(response: any): boolean {
    debugger;
    return response && typeof response === 'object' 
    && 'token' in response;
  };

  resetPassword() {
  debugger;
    this.router.navigateByUrl('/reset-password');
  }
}
