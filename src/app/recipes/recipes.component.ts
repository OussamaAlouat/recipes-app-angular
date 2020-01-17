import { Component, OnInit, Output} from '@angular/core';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  @Output() recivedRecipe: Recipe;
  constructor() { }

  ngOnInit() {
  }

  onReciveEmmitedRecipe(recipe: Recipe) {
    this.recivedRecipe = recipe;
    console.log('Recived: ', recipe);
  }

}
