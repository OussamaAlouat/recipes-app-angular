import { HttpClient } from '@angular/common/http';
import { Ingredient } from '../shared/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListStorageService{
  constructor(private http: HttpClient) {}

  saveIngredient(ingredient: Ingredient) {
    return this.http.post('http://localhost:3000/ingredients', ingredient);
  }
  getIngredient(id: number) {
    return this.http.get<Ingredient>('http://localhost:3000/ingredients/' + id);
  }
}
