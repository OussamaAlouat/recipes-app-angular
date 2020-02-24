import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  public isAutenticated: boolean;

  constructor(
    private recipesServive: RecipeService,
  ){
    this.isAutenticated = false;
  }

  ngOnInit() {}

  onFetchData() {
    this.recipesServive.fetchFromServer();
  }
}
