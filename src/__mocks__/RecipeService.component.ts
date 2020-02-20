import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Injectable } from '@angular/core';
import { first } from 'lodash';
import { Subject } from 'rxjs';

@Injectable()
export class MockRecipeService {
  recipes: Recipe[];
  public recipesChanged: Subject<Recipe []>;

  constructor() {
    this.recipesChanged = new Subject();
    this.recipes = [
      new Recipe('A test recipe',
          'This is a simple test',
          'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2019/02/Cheesy-mince-pasta-bake.jpg',
          [new Ingredient('Tomato', 2), new Ingredient('Meat', 1)], 'Other'
          )
    ];
  }

  getRecipe(id: number) {
    return first(this.recipes);
  }

  getRecipes() {
    return this.recipes;
  }

  fetchFromServer() {
    return this.recipes;
  }
}
