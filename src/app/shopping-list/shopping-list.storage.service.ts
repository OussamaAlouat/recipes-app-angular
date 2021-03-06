import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';

@Injectable()
export class ShoppingListStorageService{
  constructor(private http: HttpClient) {}

  saveIngredient(ingredient: Ingredient) {
    return this.http.post('http://localhost:3000/ingredients', ingredient);
  }

  removeIngredient(id: number) {
    return this.http.delete('http://localhost:3000/ingredients/'+ id)
  }

  getIngredients() {
    return this.http.get<Ingredient[]>('http://localhost:3000/ingredients');
  }

  getIngredient(id: number) {
    return this.http.get<Ingredient>('http://localhost:3000/ingredients/' + id);
  }

  updateIngredient(id: number, ingredient: Ingredient) {
    return this.http.put('http://localhost:3000/ingredients/' + id, ingredient);
  }
}
