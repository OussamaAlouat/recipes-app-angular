import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { format } from 'url';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  public isLoginMode:boolean;
  public isLoading: boolean;


  constructor(private authService: AuthService) {
    this.isLoginMode = true;
    this.isLoading = false;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log('This is the form: ', form);
    if ( !form.valid) {
      return ;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      // Login method
    } else {
      this.authService.signup(email, password).subscribe(
        (data) => {
          console.log(data);
          setTimeout(() => {
            this.isLoading = false;
            form.reset();
          },2000)
        }
      );
    }
  }
}
