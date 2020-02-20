import { Recipe } from './recipe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeStorageService {
  constructor(private http: HttpClient){}

  saveRecipe(recipe: Recipe) {
    return this.http.post('http://localhost:3000/recipes', recipe);
  }

  deleteRecipe(id: number) {
    return this.http.delete('http://localhost:3000/recipes/'+ id)
  }
}
