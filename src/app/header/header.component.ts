import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { RecipeStorageService } from '../recipes/recipe.storage.service';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
  public isAutenticated: boolean;
  private userSub: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
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

  onSaveData() {
    this.dataStorageService.storeRecipes();
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
