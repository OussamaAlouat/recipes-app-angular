import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import  { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  public isLoginMode:boolean;
  public isLoading: boolean;
  public error: string;
  public authObservable: Observable<AuthResponseData>;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
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
        this.showErrorAlert(err);
        this.isLoading = false;
      }
    );
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    hostViewContainerRef.createComponent(alertCmpFactory);
  }
}
