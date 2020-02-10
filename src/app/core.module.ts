import { NgModule } from '@angular/core';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';

@NgModule({
  providers: [
    ShoppingListService,
    RecipeService,
  ],
})
export class CoreModule {}
