import { Component } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { FormGroup, FormBuilder, FormControl,Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateLogin } from '../../core/models/create-login.model';
import { CommonModule } from '@angular/common';
import { passwordMatchValidator } from '../../core/validators/passwordMatch.validators';

@Component({
  selector: 'create-login',
  imports: [ReactiveFormsModule, CommonModule],
  providers: [AuthenticationService],
  templateUrl: './create-login.component.html',
  styleUrl: './create-login.component.less'
})
export class CreateLoginComponent {
 registerForm : FormGroup;
 errorMessage:string = '';
 errorList:string = '';
 hasError: boolean = false;
  

  constructor(private fb: FormBuilder
              , private authService: AuthenticationService
              , private router: Router) {

    this.registerForm = this.fb.group({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      phoneNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}')]),
      passwordConfirm: new FormControl('', [Validators.required, passwordMatchValidator ])
    });    
  }

  get firstName() { 
    return this.registerForm.get('firstName');
  }
  get lastName() { 
    return this.registerForm.get('lastName');
  }
  get phoneNo() { 
    return this.registerForm.get('phoneNo');
  }
  get email() { 
    return this.registerForm.get('email');
  }
  get password() { 
    return this.registerForm.get('password');
  }
  get passwordConfirm() { 
    return this.registerForm.get('passwordConfirm');
  }
  
//HAVE TO MOVE SUBSCRIBE TO COMPONENT
  createLogin() {
    debugger;
    console.log(this.registerForm.value);
    const val = this.registerForm.value;

    if(this.registerForm.valid) {
          const newLogin: CreateLogin = {
            userName : val.email,
            firstName : val.firstName,
            lastName : val.lastName,
            email : val.email,
            password : val.password,
            phoneNo : val.phoneNo
        };

        this.authService.createUser(newLogin)
        .subscribe({
          next: (data) => {
            // Handle successful data retrieval
            console.log("User is created");
            this.router.navigateByUrl('/login');

          },
          error: (error) => {
            debugger;
            // Handle the rethrown error
            console.error('Error caught in component:', error);
            this.hasError = true;

            if(error.error.errors) {
              error.error.errors.forEach((error: { description: string; }) => {
                this.errorList += error.description + '\n';
              });
            }
            else {
              this.errorList = error.error[0].description;
            }
            this.errorMessage = this.errorList;
            console.log("User is not created");

          },
        });        
    }
  }
}
