import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  public recivedRecipe: Recipe;
  constructor(private loggingService: LoggingService) {}

  ngOnInit() {
    this.loggingService.printLog('Hello from Recipes ngOnInit');
  }
}
