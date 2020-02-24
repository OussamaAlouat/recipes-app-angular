import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  public ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(
    private shoppingListService: ShoppingListService,
  ) {}

  ngOnInit() {
    this.shoppingListService.getIngredients().subscribe((response) => {
      this.ingredients = response;
    });

    this.subscription =  this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onEditItem(id: number) {
    this.shoppingListService.startedEditing.next(id);
  }
}
