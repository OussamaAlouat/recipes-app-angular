import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {
  @Output() ingredientToAdd: EventEmitter<Ingredient>;

  constructor() {
    this.ingredientToAdd = new EventEmitter();
   }

  ngOnInit() {
  }

  onAddIngredients(name: any, amount: any) {
    this.ingredientToAdd.emit(new Ingredient(name.value, amount.value),
    )
  }
}
