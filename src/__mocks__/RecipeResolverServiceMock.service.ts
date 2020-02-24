import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { MockRecipeService } from './RecipeService.component';
import { Recipe } from 'src/app/recipes/recipe.model';

@Injectable()
export class RecipesResolverServiceMock  implements Resolve<Recipe[]>{
  constructor(private recipesService: MockRecipeService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return [];
  }
}
