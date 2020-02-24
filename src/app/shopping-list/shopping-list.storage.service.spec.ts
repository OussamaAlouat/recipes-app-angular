import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ShoppingListStorageService } from './shopping-list.storage.service';
import { Ingredient } from '../shared/ingredient.model';

describe('ShoppingListStorageService', () => {
  const ingredientItem = new Ingredient('Apples', 5);
  let service: ShoppingListStorageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ShoppingListStorageService ]
    });

    service = TestBed.get(ShoppingListStorageService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('Should get an array with all ingredients', () => {
    service.getIngredients().subscribe((recipes: Ingredient[]) => {
      expect(recipes.length).toBe(1);
    });

    const req = httpMock.expectOne(`http://localhost:3000/ingredients`);
    expect(req.request.method).toBe('GET');
    req.flush([ingredientItem]);
    httpMock.verify();
  });

  it('Should get one specific ingredient', () => {
    service.getIngredient(1).subscribe((response: Ingredient) => {
      expect(response).toEqual({ ...ingredientItem, id: 1 })
    });

    const req = httpMock.expectOne(`http://localhost:3000/ingredients/1`);
    expect(req.request.method).toBe('GET');
    req.flush({ ...ingredientItem, id: 1 });
    httpMock.verify();
  });

  it('Should post an ingredient', () => {
    service.saveIngredient(ingredientItem).subscribe((response: Ingredient) => {
      const { name, id, amount } = response;
      expect(name).toEqual(ingredientItem.name);
      expect(amount).toEqual(ingredientItem.amount);
      expect(id).toEqual(4);
    });

    const req = httpMock.expectOne(`http://localhost:3000/ingredients`);
    expect(req.request.method).toBe('POST');

    req.flush({
      name: 'Apples',
      amount: 5,
      id: 4
    });

    httpMock.verify();
  });

  it('Should delete an ingredient', () => {
    service.removeIngredient(1).subscribe((response: {}) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`http://localhost:3000/ingredients/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
    httpMock.verify();
  });

  it('Should update a recipe', () => {
    spyOn(service, 'updateIngredient').and.callThrough();
    ingredientItem.id = 3;
    const newIngredient = new Ingredient('Apples', 10);
    const expected = { ...newIngredient, id: 3 };
    service.updateIngredient(3, newIngredient).subscribe((response) => {
      expect(response).toEqual(expected);
    });

    const req = httpMock.expectOne(`http://localhost:3000/ingredients/3`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(newIngredient);
    req.flush({
      name: "Apples",
      amount: 10,
      id: 3
    });
    httpMock.verify();
    expect(service.updateIngredient).toHaveBeenCalled();
  })
});
