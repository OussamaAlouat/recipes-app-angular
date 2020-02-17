import { ShoppingListService } from "./shopping-list.service";
import { TestBed } from '@angular/core/testing';
import { Ingredient } from '../shared/ingredient.model';
import { find } from 'lodash';

describe('ShoppingListService', () => {
  let service: ShoppingListService;
  let ingredientsChanged;
  const expected = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  beforeEach( async() => {
    TestBed.configureTestingModule({
      providers: [ShoppingListService]
    });

    service = TestBed.get(ShoppingListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get Ingredients', () => {
    it('Should return an array of ingredients as expected', () => {
      const recived = service.getIngredients();
      expect(recived).toEqual(expected);
    });
  });

  describe('Get ingredient', () => {
    beforeEach(() => {
      service = TestBed.get(ShoppingListService);
    });

    it('An ingredient should be the same as expected', () => {
      const recived = service.getIngredient(0);
      expect(recived).toEqual(expected[0]);
    });

    it('Response should be undefined', () => {
      const recived = service.getIngredient(3);
      expect(recived).toBeUndefined();
    });
  });

  describe('addIngredient', () => {
    beforeEach(() => {
      service = TestBed.get(ShoppingListService);
      service.ingredientsChanged.subscribe((response) => {
        ingredientsChanged = response;
      });
    });

    it('The array of ingredients should contains the new ingredient', () => {
      const expectEdIngredient = new Ingredient('Orange', 2);
      service.addIngredient(expectEdIngredient);
      expect(ingredientsChanged.length).toBe(3);
      expect(find(ingredientsChanged, expectEdIngredient)).toEqual(expectEdIngredient)
    });

    it('If ingredient exists, it shouldnt have been added', () => {
      spyOn(service.ingredientsChanged,'next')
      const expectEdIngredient = new Ingredient('Apples', 5);
      service.addIngredient(expectEdIngredient);
      expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
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
        const expectEdIngredient = {};
        service.addIngredient(expectEdIngredient);
        expect(service.ingredientsChanged.next).not.toHaveBeenCalled();
      });
    });
  });

  describe('Update ingredient', () => {
    beforeEach(() => {
      service = TestBed.get(ShoppingListService);
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
      const expectEdIngredient = new Ingredient('Orange', 2);
      service.updateIngredient(3, expectEdIngredient);
      expect(ingredientsChanged.length).toBe(2);
      expect(find(ingredientsChanged, expectEdIngredient)).toBeUndefined();
    });
  });

  describe('Remove ingredients', () => {
    beforeEach(() => {
      service = TestBed.get(ShoppingListService);
      service.ingredientsChanged.subscribe((response) => {
        ingredientsChanged = response;
      });
    });

    it('Should remove one ingredient', () => {
      service.removeIngreditent(0);
      expect(ingredientsChanged.length).toBe(1);
    });

    it('Should not remove one ingredient when the index is not good', () => {
      service.removeIngreditent(45);
      expect(ingredientsChanged.length).toBe(2);
    });
  });
});
