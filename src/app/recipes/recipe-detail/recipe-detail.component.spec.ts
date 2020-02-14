import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { RecipeDetailComponent } from './recipe-detail.component';

import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { of } from 'rxjs';
import { MockRecipeService } from 'src/__mocks__/RecipeService.component';
import { ButtonComponent } from 'src/app/shared/button/button.component';


describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let compiled;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeDetailComponent, ButtonComponent ],
      providers: [
        {
          provide: RecipeService,
          useClass: MockRecipeService,

        }, ShoppingListService,
        { provide: Router },
        { provide: ActivatedRoute,
          useValue: {
            params: of({ id : 1 })
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component should have content', () => {
    beforeEach(() => {
      compiled = fixture.debugElement.nativeElement;
    });

    it('Should appear an img tag', () => {
      const image = compiled.querySelector('img');
      expect(image.alt).toContain('A test recipe');
      expect(image.src.length).toBeGreaterThan(0);
    });

    it('Should appear "A test recipe" as title', () => {
      const title = compiled.querySelector('h1').textContent;
      expect(title).toEqual('A test recipe');
    });

    it('Should appear an ingredients list with two ingredients', () => {
      const list = compiled.querySelector('ul.list-group').children.length;
      expect(list).toEqual(2);
    });

    it('Should appear "This is a simple test" as description', () => {
      const description = compiled.querySelector('#description').textContent.trim();
      expect(description).toEqual('This is a simple test')
    });

    it('On click on add, onAddToShoppingList should have been called', () => {
      spyOn(component, 'onAddToShoppingList');
      const addButton = compiled.querySelector('#add');
      addButton.click();
      fixture.detectChanges();
      expect(component.onAddToShoppingList).toHaveBeenCalled();
    });

    it('On click on delete, onDeleteRecipe should have been caleld ', () => {
      spyOn(component, 'onDeleteRecipe');
      const addButton = compiled.querySelector('#delete');
      addButton.click();
      fixture.detectChanges();
      expect(component.onDeleteRecipe).toHaveBeenCalled();
    });

    it('On click on edit, onEditRecipe should have been caleld ', () => {
      spyOn(component, 'onEditRecipe');
      const addButton = compiled.querySelector('#edit');
      addButton.click();
      fixture.detectChanges();
      expect(component.onEditRecipe).toHaveBeenCalled();
    });
  });
});
