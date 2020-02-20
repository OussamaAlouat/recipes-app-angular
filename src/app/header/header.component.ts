import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  public isAutenticated: boolean;
  private userSub: Subscription;

  constructor(
    private recipesServive: RecipeService,
    private authService: AuthService
  ){
    this.isAutenticated = false;
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAutenticated = !!user;
    });
  }

  onFetchData() {
    this.recipesServive.fetchFromServer();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
}
