import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipeStorageService {
  constructor(private http: HttpClient){}

  saveRecipe(recipe: Recipe) {
    return this.http.post('http://localhost:3000/recipes', recipe);
  }

  deleteRecipe(id: number) {
    return this.http.delete('http://localhost:3000/recipes/'+ id)
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('http://localhost:3000/recipes')
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      })
    );
  }
}
