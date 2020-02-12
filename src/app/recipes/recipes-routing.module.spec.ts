import { Routes, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
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

import { LoggingService } from '../logging.service';
import { RecipeService } from './recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { MockRecipeService } from 'src/__mocks__/RecipeService.component';
import { RecipesResolverServiceMock } from 'src/__mocks__/RecipeResolverServiceMock.service';

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
        RecipeItemComponent
      ],
      providers: [
        LoggingService,
        RecipeService,
        ShoppingListService,
        RecipesResolverServiceMock,
        MockRecipeService
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
