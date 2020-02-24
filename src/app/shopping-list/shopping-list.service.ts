import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { find, isNil } from 'lodash';
import { ShoppingListStorageService } from './shopping-list.storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {
  ingredientsChanged= new Subject<Ingredient[]>();
  public startedEditing: Subject<number>;
  private ingredients: Ingredient[];

  constructor(private shoppingListStorage: ShoppingListStorageService) {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
    ];

    this.startedEditing = new Subject();
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    if (this.isIngredientValid(ingredient)) {
      this.shoppingListStorage.saveIngredient(ingredient)
        .subscribe((response) => {
          console.log(response)
        })
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    if (this.ingredients[index] && this.isIngredientValid(newIngredient)) {
      this.ingredients[index] = newIngredient;
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }

  addIngredients(ingredients: Ingredient []) {
    if (ingredients && ingredients.length) {
      this.ingredients.push(...ingredients);
      this.ingredientsChanged.next(this.ingredients.slice());
    }
  }

  removeIngreditent(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  private isIngredientValid(ingredient: Ingredient) {
    if (isNil(ingredient)
      || isNil(ingredient.amount)
      || isNil(ingredient.name)
      || find(this.ingredients, ingredient)
    ) {
      return false;
    }

    return true
  }
}
