import { Routes, Router } from '@angular/router';
import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';

import { RecipeService } from './recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { MockRecipeService } from 'src/__mocks__/RecipeService.component';
import { RecipesResolverServiceMock } from 'src/__mocks__/RecipeResolverServiceMock.service';
import { FormInputComponent } from '../shared/form/form-input/form-input.component';
import { FormTextAreaComponent } from '../shared/form/form-text-area/form-text-area.component';
import { FormCheckboxesComponent } from '../shared/form/form-checkboxes/form-checkboxes.component';
import { ButtonComponent } from '../shared/button/button.component';
import { RecipeStorageService } from './recipe.storage.service';

const routes: Routes = [
  {
    path: '',
    component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverServiceMock]},
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverServiceMock] },
    ]
  },
];

describe('Recipes routing', () => {
  let location : Location;
  let router: Router;
  let fixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule
      ],
      declarations:
      [
        RecipesComponent,
        RecipeStartComponent,
        RecipeDetailComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipeItemComponent,
        FormInputComponent,
        FormTextAreaComponent,
        FormCheckboxesComponent,
        ButtonComponent
      ],
      providers: [
        RecipeService,
        ShoppingListService,
        RecipesResolverServiceMock,
        MockRecipeService,
        RecipeStorageService
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(RecipesComponent);
    router.initialNavigation();
  }));


  it('navigate to "/new" location should be "/new"', fakeAsync(() => {
    router.navigate(["new"]);
    tick();
    expect(location.path()).toBe("/new");
  }));

  it('navigate to "/1" location should be "/1"', fakeAsync(() => {
    router.navigate(["1"]);
    tick();
    expect(location.path()).toBe("/1");
  }));

  it('navigate to "/1/edit" location should be "/1/edit"', fakeAsync(() => {
    router.navigate(["1/edit"]);
    tick();
    expect(location.path()).toBe("/1/edit");
  }));
});
