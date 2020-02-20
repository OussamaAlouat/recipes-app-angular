import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
  ) {}

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    for (let i = 0; i < recipes.length; i++) {
      this.storeOneRecipe(recipes[i]);
    }
  }

  storeOneRecipe(recipe) {
    this.http.post('http://localhost:3000/recipes', recipe)
      .subscribe((response) => {
        console.log(response);
    });
  }
}
