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
});
