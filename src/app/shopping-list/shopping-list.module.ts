import { NgModule } from '@angular/core';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { SharedModue } from '../shared/shared.module';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    FormsModule,
    ShoppingListRoutingModule,
    SharedModue,
    ReactiveFormsModule,
  ]
})

export class ShoppingListModule {}
