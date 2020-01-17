import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Output() selectedRecipe: EventEmitter<Recipe>;

  constructor() {
    this.selectedRecipe = new EventEmitter();
  }

  ngOnInit() {
  }

  onSelectRecipe() {
    this.selectedRecipe.emit( this.recipe);
  }

}
