import { NgModule } from '@angular/core';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { VariablesNeeded } from 'variables';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
    VariablesNeeded,
  ],
})
export class CoreModule {}
