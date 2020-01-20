import { Recipe } from './recipe.model';
import { Output, EventEmitter } from '@angular/core';

export class RecipeService {
  private recipes: Recipe [];
  @Output() selectedRecipe: EventEmitter<Recipe>;

  constructor() {
    this.recipes = [
      new Recipe('A test recipe',
        'This is a simple test',
        'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2019/02/Cheesy-mince-pasta-bake.jpg'
      ),
      new Recipe('A  second test recipe',
        'This is a simple second test',
        'https://assets.epicurious.com/photos/5d375cfdae657500091e79e8/6:4/w_620%2Ch_413/TomatoCobbler_RECIPE_071719_7362.jpg'
      ),
    ];

    this.selectedRecipe = new EventEmitter();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  onSelectRecipe(recipe:Recipe) {
    this.selectedRecipe.emit(recipe);
  }

}
