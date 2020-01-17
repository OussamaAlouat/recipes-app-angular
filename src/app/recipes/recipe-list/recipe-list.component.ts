import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  public recipes: Recipe [];

  constructor() {
    this.recipes = [
      new Recipe('A test recipe',
        'This is a simple test',
        'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2019/02/Cheesy-mince-pasta-bake.jpg'
      ),
      new Recipe('A  second test recipe',
      'This is a simple second test',
      'https://assets.epicurious.com/photos/5d375cfdae657500091e79e8/6:4/w_620%2Ch_413/TomatoCobbler_RECIPE_071719_7362.jpg'
    ),
    ];
  }

  ngOnInit() {
  }

}
