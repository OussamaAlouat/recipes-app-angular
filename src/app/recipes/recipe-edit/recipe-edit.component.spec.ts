import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit.component';
import { ActivatedRoute, Router, Route } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { of } from 'rxjs';

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeEditComponent ],
      providers: [
        RecipeService,
        ShoppingListService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id : null})
          }
        },
        {
          provide: Router,
        }
      ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeEditComponent);
    component = fixture.componentInstance;
    component.editMode = false;
    fixture.detectChanges();
  });

  it('should create with editmode equals to false', () => {
    expect(component).toBeTruthy();
  });
});
