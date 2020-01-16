import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {
  public ingredients: Ingredient[];

  constructor() {
    this.ingredients = [
      new Ingredient('Apples', 5),
      new Ingredient('Tomatoes', 10)

    ];
  }

  ngOnInit() {
  }

}
