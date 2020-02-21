import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecipeStorageService } from './recipe.storage.service';
import { Recipe } from './recipe.model';

describe('Recipes storage service', () => {
  const recipeItem = new Recipe('test', 'Test desc', 'No image', [], 'Other');
  let service: RecipeStorageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ RecipeStorageService ]
    });

    service = TestBed.get(RecipeStorageService);
    httpMock = TestBed.get(HttpTestingController);
  });


  it('Should get an array with all recipes', () => {
    service.fetchRecipes().subscribe((recipes: Recipe[]) => {
      expect(recipes.length).toBe(1);
    });

    const req = httpMock.expectOne(`http://localhost:3000/recipes`);
    expect(req.request.method).toBe('GET');

    req.flush([recipeItem]);

    httpMock.verify();
  });

  it('Should post a recipe', () => {
    service.saveRecipe(recipeItem).subscribe((response: any) => {
      const { name, description, imagePath, ingredients, typeOfRecipe, id } = response;
      expect(name).toEqual(recipeItem.name);
      expect(description).toEqual(recipeItem.description);
      expect(imagePath).toEqual(recipeItem.imagePath);
      expect(ingredients).toEqual(recipeItem.ingredients);
      expect(typeOfRecipe).toEqual(recipeItem.typeOfRecipe);
      expect(id).toEqual(4);
    });

    const req = httpMock.expectOne(`http://localhost:3000/recipes`);
    expect(req.request.method).toBe('POST');

    req.flush({
      name: "test",
      description: "Test desc",
      imagePath: "No image",
      ingredients: [],
      typeOfRecipe: "Other",
      id: 4
    });

    httpMock.verify();
  });

  it('Should delete a recipe', () => {
    service.deleteRecipe(1).subscribe((response: any) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`http://localhost:3000/recipes/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    httpMock.verify();
  });
});
