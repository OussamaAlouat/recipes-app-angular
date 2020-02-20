import { NgModule } from '@angular/core';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { RecipeStorageService } from './recipes/recipe.storage.service';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    RecipeStorageService
  ],
})

export class CoreModule {}
