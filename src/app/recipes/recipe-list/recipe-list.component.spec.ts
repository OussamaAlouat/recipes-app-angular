import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RecipeListComponent } from './recipe-list.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { MockRecipeService } from 'src/__mocks__/RecipeService.component';
import { RecipeService } from '../recipe.service';

describe('RecipeListComponent', () => {
  let component: RecipeListComponent;
  let fixture: ComponentFixture<RecipeListComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeListComponent, RecipeItemComponent, ButtonComponent ],
      providers: [
        {
          provide: RecipeService,
          useClass: MockRecipeService,
        }
      ],
      imports: [ RouterTestingModule ]
   })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeListComponent);
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

    it('Should appear one recipe at least', () => {
      const nodeListOfAppRecipes = compiled.querySelectorAll('app-recipe-item');
      expect(nodeListOfAppRecipes.length).toBeGreaterThanOrEqual(1);
    });

    it('On click on a new Recipe button, onNewRecipe() function should have been called', () => {
      spyOn(component, 'onNewRecipe');
      const button = compiled.querySelector('button');
      button.click();
      fixture.detectChanges();
      expect(component.onNewRecipe).toHaveBeenCalled();
    });
  });
});
