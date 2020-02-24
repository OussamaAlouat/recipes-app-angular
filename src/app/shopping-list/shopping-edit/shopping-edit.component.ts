import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})

export class ShoppingEditComponent implements OnInit, OnDestroy {
  shoppingForm: FormGroup;
  private subscription: Subscription;
  editMode: boolean = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService : ShoppingListService) {}

  ngOnInit() {
    this.createForm();
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.shoppingListService.getIngredient(index).subscribe((response) => {
          this.editedItem = response;
          this.shoppingForm.controls.name.setValue(this.editedItem.name);
          this.shoppingForm.controls.amount.setValue(this.editedItem.amount);
        })
      }
    );
  }

  onSubmit() {
    const value = this.shoppingForm.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    this.shoppingForm.reset();
  }

  onClearForm() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onRemove(){
    this.shoppingListService.removeIngreditent(this.editedItem.id);
    this.editMode = false;
    this.shoppingForm.reset();
  }

  private createForm() {
    this.shoppingForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    });
  }
}
