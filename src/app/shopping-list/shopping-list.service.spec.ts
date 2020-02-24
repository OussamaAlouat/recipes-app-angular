import { ShoppingListService } from "./shopping-list.service";
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Ingredient } from '../shared/ingredient.model';
import { find } from 'lodash';
import { ShoppingListStorageService } from './shopping-list.storage.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ShoppingListService', () => {
  let service: ShoppingListService;
  let ingredientsChanged;
  let shoppingListStorageServiceMock;

  const expected = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  beforeEach( async() => {
    shoppingListStorageServiceMock = jasmine.createSpyObj(['saveIngredient', 'getIngredient', 'getIngredients', 'removeIngredient']);
    shoppingListStorageServiceMock.saveIngredient.and.returnValue(of( expected[0] ));
    shoppingListStorageServiceMock.getIngredients.and.returnValue(of( expected ));
    shoppingListStorageServiceMock.getIngredient.and.returnValue(of(expected[0]));
    shoppingListStorageServiceMock.removeIngredient.and.returnValue(of(expected[0]));

    TestBed.configureTestingModule({
      providers: [
        ShoppingListService,
        {
          provide: ShoppingListStorageService,
          useValue: shoppingListStorageServiceMock
        }
      ],
      imports: [HttpClientTestingModule]
    });

    service = TestBed.get(ShoppingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get Ingredients', () => {
    it('Should return an array of ingredients as expected', async() => {
      const response = await service.getIngredients().toPromise();
      expect(response).toEqual(expected);
      expect(shoppingListStorageServiceMock.getIngredients).toHaveBeenCalled();
    });
  });

  describe('Get ingredient', () => {
    it('An ingredient should be the same as expected', async() => {
      let recived = await service.getIngredient(0).toPromise();
      expect(recived).toEqual(expected[0]);
      expect(shoppingListStorageServiceMock.getIngredient).toHaveBeenCalled();
    });

    it('Response should be undefined', async() => {
      shoppingListStorageServiceMock.getIngredient.and.returnValue(of(undefined));
      let recived = await service.getIngredient(0).toPromise();
      expect(recived).toBeUndefined();
    });
  });

  describe('addIngredient', () => {
    beforeEach(() => {
      service.ingredientsChanged.subscribe((response) => {
        ingredientsChanged = response;
      });
    });

    it('The array of ingredients should contains the new ingredient', () => {
      const expectEdIngredient = new Ingredient('Orange', 2);
      shoppingListStorageServiceMock.getIngredients.and.returnValue(of( [...expected, expectEdIngredient] ));
      service.addIngredient(expectEdIngredient);
      expect(ingredientsChanged.length).toBe(3);
      expect(find(ingredientsChanged, expectEdIngredient)).toEqual(expectEdIngredient)
    });

    it('If ingredient exists, it shouldnt have been added', () => {
      spyOn(service.ingredientsChanged,'next')
      const expectEdIngredient = new Ingredient('Apples', 5);
      service.addIngredient(expectEdIngredient);
      expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      expect(shoppingListStorageServiceMock.saveIngredient).not.toHaveBeenCalled();
    });

    describe('Parameter should be nill or empty and the array should not been modified', () => {
      it('Parameter should be null', () => {
        spyOn(service.ingredientsChanged,'next')
        const expectEdIngredient = null;
        service.addIngredient(expectEdIngredient);
        expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      });

      it('Parameter should be undefined', () => {
        spyOn(service.ingredientsChanged,'next')
        const expectEdIngredient = undefined;
        service.addIngredient(expectEdIngredient);
        expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      });

      it('Parameter should be an empty object', () => {
        spyOn(service.ingredientsChanged,'next')
        const expectEdIngredient = { name: null, amount: null };
        service.addIngredient(expectEdIngredient);
        expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      });
    });
  });

  describe('Update ingredient', () => {
    beforeEach(() => {
      service.ingredientsChanged.subscribe((response) => {
        ingredientsChanged = response;
      });
    });

    it('On update ingredient, should reflect this information on ingredients array', () => {
      const expectEdIngredient = new Ingredient('Orange', 2);
      service.updateIngredient(0, expectEdIngredient);
      expect(ingredientsChanged.length).toBe(2);
      expect(ingredientsChanged[0]).toEqual(expectEdIngredient);
    });

    it('On try to update not existing index, should return the ingredients array without changes', () => {
      spyOn(service.ingredientsChanged,'next')
      const expectEdIngredient = new Ingredient('Orange', 2);
      service.updateIngredient(3, expectEdIngredient);
      expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
    });

    describe('Ingredient should be nill or empty, and ingreident should not be modified', () => {
      it('Ingredient should be null', () => {
        spyOn(service.ingredientsChanged,'next')
        const expectEdIngredient = null;
        service.updateIngredient(0, expectEdIngredient);
        expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      });

      it('Ingredient should be undefined', () => {
        spyOn(service.ingredientsChanged,'next')
        const expectEdIngredient = undefined;
        service.updateIngredient(0, expectEdIngredient);
        expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      });

      it('Ingredient should be empty', () => {
        spyOn(service.ingredientsChanged,'next')
        const expectEdIngredient = { name: null, amount: null };
        service.updateIngredient(0, expectEdIngredient);
        expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      });
    });
  });

  describe('Remove ingredients', () => {
    beforeEach(() => {
      service.ingredientsChanged.subscribe((response) => {
        ingredientsChanged = response;
      });
    });

    it('Should remove one ingredient', async() => {
      shoppingListStorageServiceMock.getIngredients.and.returnValue(of([expected[1]] ));
      service.removeIngreditent(0);
      expect(shoppingListStorageServiceMock.removeIngredient).toHaveBeenCalled();
      expect(ingredientsChanged.length).toBe(1);
    });

    it('Should not remove one ingredient when the index is not good', () => {
      service.removeIngreditent(-1);
      expect(ingredientsChanged.length).toBe(2);
    });
  });

  describe('Add ingredients', () => {
    beforeEach(() => {
      service.ingredientsChanged.subscribe((response) => {
        ingredientsChanged = response;
      });
    });

    it('Should add the ingredients', () => {
      const newIngredients = [
        new Ingredient('Orange', 5),
        new Ingredient('Banana', 10)
      ];

      service.addIngredients(newIngredients);
      expect(ingredientsChanged.length).toBe(4);
    });

    describe('The parameter should be nill or empty', () => {
      it('When the parameter is an empty array, should not add anithing', () => {
        spyOn(service.ingredientsChanged, 'next');
        const newIngredients = [];
        service.addIngredients(newIngredients);
        expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      });

      it('The parameter should be null', () => {
        spyOn(service.ingredientsChanged, 'next');
        const newIngredients = null;
        service.addIngredients(newIngredients);
        expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      });

      it('The parameter should be undefined', () => {
        spyOn(service.ingredientsChanged, 'next');
        const newIngredients = undefined;
        service.addIngredients(newIngredients);
        expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      });
    });
  });
});
