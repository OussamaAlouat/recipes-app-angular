import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientsChanged= new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[];

  constructor() {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
    ];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
