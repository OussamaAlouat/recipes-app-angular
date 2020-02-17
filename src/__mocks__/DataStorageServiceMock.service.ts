import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../app/auth/auth.service';
import { MockRecipeService } from './RecipeService.component';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: MockRecipeService,
    private authService: AuthService
  ) {}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    for (let i = 0; i < recipes.length; i++) {
      // facke code to sore
    }
  }

  storeOneRecipe(recipe) {
    return recipe;
  }

  fetchRecipes() {
    // Facke a fetch method
    return this.recipeService.getRecipes();
  }
}
