import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { format } from 'url';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  public isLoginMode:boolean;
  public isLoading: boolean;
  public error: string;
  public authObservable: Observable<AuthResponseData>;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.isLoginMode = true;
    this.isLoading = false;
    this.error = null;
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if ( !form.valid) {
      return ;
    }

    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if (this.isLoginMode) {
      this.authObservable = this.authService.login(email, password);
    } else {
     this.authObservable = this.authService.signup(email, password);
    }

    this.authObservable.subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
        form.reset();
      }, err => {
        this.error = err;
        this.isLoading = false;
      }
    );
  }
}
