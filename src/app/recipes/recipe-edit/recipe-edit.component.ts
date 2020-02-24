import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { find } from 'lodash';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})

export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;
  types: {id: number, name: string}[];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {
    this.types =  [
      { id: 1, name: 'Vegetable' },
      { id: 2, name: 'Meat' },
      { id: 3, name: 'Fruit' },
      { id: 400, name: 'Other' }
    ];
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    let recipeName: String = '';
    let recipeImage: String = '';
    let recipeDescription: String ='';
    let recipeIngredients: FormArray = new FormArray([]);

    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImage = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe.ingredients) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount,
                [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImage, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients,
      'typeOfRecipe': new FormArray([])
    });
  }

  onSubmit() {
    const selectedType = this.getSelectedCheckbox(this.recipeForm.value.typeOfRecipe);
    const { name, imagePath, description, ingredients } = this.recipeForm.value;
    const myRecipe = new Recipe(name, description, imagePath, ingredients, selectedType.name);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, myRecipe);
    } else {
      this.recipeService.addRecipe(myRecipe);
    }

    this.redirectToRecipes();
  }

  getSelectedCheckbox(array) {
    const selectedOrderIds = array.map((v, i) => (v ? this.types[i].id : null)).filter(v => v !== null);
    const finded = find(this.types, { id: selectedOrderIds ? selectedOrderIds[0]: undefined });
    return finded;
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  }

  onCancel() {
    this.redirectToRecipes();
  }

  redirectToRecipes() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
