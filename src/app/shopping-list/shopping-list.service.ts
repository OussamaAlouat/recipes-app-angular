import { Ingredient } from '../shared/ingredient.model';
import { Subject, Observable } from 'rxjs';
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
    return this.shoppingListStorage.getIngredients();
  }

  getIngredient(index: number): Observable<Ingredient> {
    return this.shoppingListStorage.getIngredient(index);;
  }

  addIngredient(ingredient: Ingredient) {
    if (this.isIngredientValid(ingredient)) {
      this.shoppingListStorage.saveIngredient(ingredient)
        .subscribe((response) => {
          this.fetchFromServer();
        })
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
