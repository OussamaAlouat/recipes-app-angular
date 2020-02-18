import { Ingredient } from 'src/app/shared/ingredient.model';
import { Subject } from 'rxjs';
import { find, isNil } from 'lodash';

export class ShoppingListServiceMock {
  ingredientsChanged= new Subject<Ingredient[]>();
  public startedEditing: Subject<number>;
  private ingredients: Ingredient[];

  constructor() {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)
    ];

    this.startedEditing = new Subject();
  }


  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
    }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeIngreditent(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
