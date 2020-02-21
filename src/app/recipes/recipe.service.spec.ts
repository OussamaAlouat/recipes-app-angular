import { TestBed } from "@angular/core/testing";
import { RecipeService } from './recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { clone } from 'lodash';
import { RecipeStorageService } from './recipe.storage.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';

describe('RecipeService', () => {
  const recipeItem = new Recipe('A test recipe', 'This is a simple test',
  'testImane',[new Ingredient('Tomato', 2), new Ingredient('Meat', 1)], 'Other');
  let service: RecipeService;
  const arrayOfRecipes: Recipe[] = [recipeItem];
  const expectedIngredients = [ new Ingredient('Apple', 2), new Ingredient('Orange', 1)]
  let shoppingListServiceMock;
  let recipesStorageServiceMock;

  beforeEach( async() => {
    shoppingListServiceMock = jasmine.createSpyObj(['addIngredients']);
    shoppingListServiceMock.addIngredients.and.returnValue(expectedIngredients);
    recipesStorageServiceMock = jasmine.createSpyObj(['saveRecipe','fetchRecipes' ,'deleteRecipe', 'updateRecipe']);
    recipesStorageServiceMock.saveRecipe.and.returnValue(of({ ...recipeItem }));
    recipesStorageServiceMock.deleteRecipe.and.returnValue(of({ ...recipeItem }));
    recipesStorageServiceMock.updateRecipe.and.returnValue(of({ ...recipeItem }))
    recipesStorageServiceMock.fetchRecipes.and.returnValue(of(arrayOfRecipes))
    TestBed.configureTestingModule({
      providers: [
        HttpClient,
        HttpHandler,
        RecipeService,
        {
          provide: RecipeStorageService, useValue: recipesStorageServiceMock
        },
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

    describe('Parameter should nill or empty, and should not add any reipe', () => {
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

      it('Parameter should be empty', () => {
        const recipeToUpdate = {
          name: null,
          description: null,
          imagePath: null,
          typeOfRecipe: null,
          ingredients: null
        };

        spyOn(service.recipesChanged, 'next');
        service.addRecipe(recipeToUpdate);
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
      spyOn(service.recipesChanged, 'next');
      const updated = new Recipe('Test', 'description', 'testImane',[], 'Other');
      service.updateRecipe(1, updated);
      expect(service.recipesChanged.next).not.toHaveBeenCalled();
    });

    describe('Recipe should be nill or empty, and recipe should not updated', () => {
      it('Parameter should be null', () => {
        spyOn(service.recipesChanged, 'next');
        service.updateRecipe(0, null);
        expect(service.recipesChanged.next).not.toHaveBeenCalled();
      });

      it('Parameter should be undefined', () => {
        spyOn(service.recipesChanged, 'next');
        service.updateRecipe(0, undefined);
        expect(service.recipesChanged.next).not.toHaveBeenCalled();
      });

      it('Parameter should be empty', () => {
        const recipeToUpdate = {
          name: null,
          description: null,
          imagePath: null,
          typeOfRecipe: null,
          ingredients: null
        };

        spyOn(service.recipesChanged, 'next');
        service.updateRecipe(0, recipeToUpdate);
        expect(service.recipesChanged.next).not.toHaveBeenCalled();
      });
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
      spyOn(service, 'deleteRecipe').and.callThrough();
      service.deleteRecipe(1);
      expect(service.deleteRecipe).toHaveBeenCalled();
    });
  });

  describe('Add ingredients', () => {
    it('On addIngredientsToShoppingList, addIngredients should have been calles', () => {
      service.addIngredientsToShoppingList(expectedIngredients);
      expect(shoppingListServiceMock.addIngredients).toHaveBeenCalled();
    });
  });

  describe('Fetch from server', () => {
    it('On fetch form server, should get recipes', () => {
      spyOn(service, 'fetchFromServer').and.callThrough();
      spyOn(service, 'setRecipes');
      service.fetchFromServer();
      expect(service.fetchFromServer).toHaveBeenCalled();
      expect(service.setRecipes).toHaveBeenCalled();
    });

  it('On fetch from server, should get error', () => {
      recipesStorageServiceMock.fetchRecipes.and.throwError('Server error');
      spyOn(service, 'fetchFromServer');
      service.fetchFromServer();
      expect(service.fetchFromServer).toHaveBeenCalled();
      expect(recipesStorageServiceMock.fetchRecipes).toThrow();
    });
  });
});
