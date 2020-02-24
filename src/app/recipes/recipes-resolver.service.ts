import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Recipe } from './recipe.model';
import { RecipeStorageService } from './recipe.storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService  implements Resolve<Recipe[]>{
  constructor(private recipesStorageService: RecipeStorageService,
    private recipesService: RecipeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0 ){
      return this.recipesStorageService.fetchRecipes();
    }

    return recipes;
  }
}
