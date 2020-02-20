import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { isNil } from 'lodash';
import { RecipeStorageService } from './recipe.storage.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe [];
  public recipesChanged: Subject<Recipe []>;

  constructor(
    private slService: ShoppingListService,
    private recipesStorageService: RecipeStorageService)
  {
    this.recipes = [];
    this.recipesChanged = new Subject();
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(id:number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    if (this.isRecipeValdi(recipe)) {
      this.recipesStorageService.saveRecipe(recipe)
        .subscribe((response) => {
          this.recipes.push(recipe);
          this.recipesChanged.next(this.recipes.slice());
        }, (err) => {
          console.log(err);
        });
    }
  }

  updateRecipe(index: number, recipe: Recipe) {
    if (this.recipes[index] && this.isRecipeValdi(recipe)) {
      this.recipes[index] = recipe;
      this.recipesChanged.next(this.recipes.slice());
    }
  }

  deleteRecipe(index: number) {
    if(this.recipes[index]) {
      const recipeToDelete = this.recipes[index];
      this.recipesStorageService.deleteRecipe(recipeToDelete.id)
        .subscribe((response) => {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
        }, (err) => {
          console.log(err);
        });
    }
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  private isRecipeValdi(recipe: Recipe) {
    if (isNil(recipe)
      || isNil(recipe.name)
      || isNil(recipe.description)
      || isNil(recipe.imagePath)
      || isNil(recipe.typeOfRecipe)
    ) {
      return false;
    }

    return true;
  }
}
