import { Recipe } from './recipe.model';
import { Output, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  private recipes: Recipe [];
  public recipesChanged: Subject<Recipe []>;

  constructor(private slService: ShoppingListService) {
    this.recipes = [
      new Recipe('A test recipe',
        'This is a simple test',
        'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2019/02/Cheesy-mince-pasta-bake.jpg',
        [new Ingredient('Tomato', 2), new Ingredient('Meat', 1)]
      ),
      new Recipe('A  second test recipe',
        'This is a simple second test',
        'https://assets.epicurious.com/photos/5d375cfdae657500091e79e8/6:4/w_620%2Ch_413/TomatoCobbler_RECIPE_071719_7362.jpg',
        [new Ingredient('patato', 20)]
      ),
    ];

    this.recipesChanged = new Subject();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(id:number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
}
