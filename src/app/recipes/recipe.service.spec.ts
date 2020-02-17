import { TestBed } from "@angular/core/testing";
import { RecipeService } from './recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { clone } from 'lodash';

describe('RecipeService', () => {
  const recipeItem = new Recipe('A test recipe', 'This is a simple test',
  'testImane',[new Ingredient('Tomato', 2), new Ingredient('Meat', 1)], 'Other');
  let service: RecipeService;
  const arrayOfRecipes: Recipe[] = [recipeItem];
  const expectedIngredients = [ new Ingredient('Apple', 2), new Ingredient('Orange', 1)]
  let shoppingListServiceMock;

  beforeEach( async() => {
    shoppingListServiceMock = jasmine.createSpyObj(['addIngredients']);
    shoppingListServiceMock.addIngredients.and.returnValue(expectedIngredients);
    TestBed.configureTestingModule({
      providers: [RecipeService,
        {
          provide: ShoppingListService, useValue: shoppingListServiceMock
        }
      ],
    });

    service = TestBed.get(RecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get Recipes', () => {
    it('Should return an empty recipes array', () => {
      const recipes: Recipe[] = service.getRecipes();
      expect(recipes).toEqual([]);
    });

    it('Should return a recipes array with data', () => {
      service.setRecipes(clone(arrayOfRecipes));
      const recipes: Recipe[] = service.getRecipes();
      expect(recipes).toEqual(arrayOfRecipes);
    });
  });

  describe('Get recipe', () => {
    beforeEach(() => {
      service.setRecipes(clone(arrayOfRecipes));
    });

    it('With a bad index should return undefined', () => {
      const response = service.getRecipe(1);
      expect(response).toBeUndefined();
    });

    it('Should return a recipe', () => {
      const response = service.getRecipe(0);
      expect(response).toEqual(recipeItem);
    });
  });

  describe('Add Recipe', () => {
    let recipesChanged = [];
    beforeEach(() => {
      service.recipesChanged.subscribe((response) => {
        recipesChanged = response;
      });
    });

    it('Should add the recipe', () => {
      service.addRecipe(recipeItem);
      expect(recipesChanged).toEqual([recipeItem])
    });

    describe('Parameter should nill, and should not add any reipe', () => {
      it('Parameter should be null', () => {
        spyOn(service.recipesChanged, 'next');
        service.addRecipe(null);
        expect(service.recipesChanged.next).not.toHaveBeenCalled();
      });

      it('Parameter should be undefined', () => {
        spyOn(service.recipesChanged, 'next');
        service.addRecipe(undefined);
        expect(service.recipesChanged.next).not.toHaveBeenCalled();
      });
    });
  });

  describe('Update recipe', () => {
    let recipesChanged = [];
    beforeEach(() => {
      service.setRecipes(clone(arrayOfRecipes));
      service.recipesChanged.subscribe((response) => {
        recipesChanged = response;
      });
    });

    it('Should update the recipe', () => {
      const updated = new Recipe('Test', 'description', 'testImane',[], 'Other');
      service.updateRecipe(0, updated);
      expect(recipesChanged).toEqual([updated]);
    });

    it('On bad index, the recipe should not update', () => {
      const updated = new Recipe('Test', 'description', 'testImane',[], 'Other');
      service.updateRecipe(1, updated);
      expect(recipesChanged).toEqual(arrayOfRecipes);
    });
  });

  describe('Delete a recipe', () => {
    let recipesChanged = [];
    beforeEach(() => {
      service.setRecipes(clone(arrayOfRecipes));
      service.recipesChanged.subscribe((response) => {
        recipesChanged = response;
      });
    });

    it('A recipe should be deleted', () => {
      service.deleteRecipe(0);
      expect(recipesChanged).toEqual([]);
    });

    it('On not valid index, recipes should not changed', () => {
      service.deleteRecipe(1);
      expect(recipesChanged).toEqual(arrayOfRecipes);
    })
  });


  describe('Add ingredients', () => {
    it('On addIngredientsToShoppingList, addIngredients should have been calles', () => {
      service.addIngredientsToShoppingList(expectedIngredients);
      expect(shoppingListServiceMock.addIngredients).toHaveBeenCalled();
    });
  });
});
