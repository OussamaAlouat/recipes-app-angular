import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
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

  fetchRecipes() {
    return this.http.get<Recipe[]>('http://localhost:3000/recipes')
    .pipe(
      map(recipes => {
        console.log('recipes: ', recipes);
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }
}
