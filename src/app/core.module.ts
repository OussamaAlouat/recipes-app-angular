import { NgModule } from '@angular/core';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { RecipeStorageService } from './recipes/recipe.storage.service';
import { ShoppingListStorageService } from './shopping-list/shopping-list.storage.service';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    RecipeStorageService,
    ShoppingListStorageService
  ],
})

export class CoreModule {}
