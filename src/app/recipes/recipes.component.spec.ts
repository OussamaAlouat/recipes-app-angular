import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';

import { RecipeService } from './recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { ButtonComponent } from '../shared/button/button.component';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipesComponent, RecipeListComponent, RecipeItemComponent, ButtonComponent ],
      imports: [ RouterTestingModule ],
      providers: [ RecipeService, ShoppingListService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
