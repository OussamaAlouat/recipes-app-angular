import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { MockRecipeService } from './RecipeService.component';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Recipe } from 'src/app/recipes/recipe.model';

@Injectable()
export class RecipesResolverServiceMock  implements Resolve<Recipe[]>{
  constructor(private dataStorageService: DataStorageService,
    private recipesService: MockRecipeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0 ){
      return this.dataStorageService.fetchRecipes();
    }

    return recipes;
  }
}
