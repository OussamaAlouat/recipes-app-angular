import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService : ShoppingListService) {}

  ngOnInit() {
  }

  onAddIngredients(name: any, amount: any) {
    this.shoppingListService.addIngredient(new Ingredient(name.value, amount.value));
  }
}
