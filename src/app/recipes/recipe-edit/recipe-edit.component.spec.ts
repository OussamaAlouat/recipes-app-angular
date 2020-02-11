import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit.component';
import { ActivatedRoute, Router } from '@angular/router';

import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

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

  describe('The form is not valid when', () => {
    beforeEach(() => {
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('The input name is empty, name should be not valid', () => {
      component.recipeForm.controls.name.setValue(null);
      expect(component.recipeForm.valid).toBe(false);
      expect(component.recipeForm.controls.name.valid).toBe(false);
    });

    it('The input imagePath is empty, imagePath should be not valid', () => {
      component.recipeForm.controls.imagePath.setValue(null);
      expect(component.recipeForm.valid).toBe(false);
      expect(component.recipeForm.controls.imagePath.valid).toBe(false);
    });

    it('The input description is empty, description should be not valid', () => {
      component.recipeForm.controls.description.setValue(null);
      expect(component.recipeForm.valid).toBe(false);
      expect(component.recipeForm.controls.description.valid).toBe(false);
    });
  });

  describe('The form elements should be valid, when', () => {
    it('The name elemet have content', () => {
      component.recipeForm.controls.name.setValue('Name test');
      expect(component.recipeForm.controls.name.valid).toBe(true);
    });

    it('The description elemet have content', () => {
      component.recipeForm.controls.description.setValue('description test');
      expect(component.recipeForm.controls.description.valid).toBe(true);
    });

    it('The imagePath elemet have content', () => {
      component.recipeForm.controls.imagePath.setValue('image');
      expect(component.recipeForm.controls.imagePath.valid).toBe(true);
    });
  });

  describe('Form should be valid when', () => {
    it('All form elements are not empty', () => {
      component.recipeForm.controls.name.setValue('Tests');
      component.recipeForm.controls.description.setValue('Description test');
      component.recipeForm.controls.imagePath.setValue('This is the image path');
      fixture.detectChanges();
      const saveButton =fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
      expect(saveButton.disabled).toBe(false);
    });
  });

  describe('When submit the form', () => {
    fit('onSubmit function should be called', () => {
      spyOn(component, 'onSubmit');
      component.recipeForm.controls.name.setValue('Tests');
      component.recipeForm.controls.description.setValue('Description test');
      component.recipeForm.controls.imagePath.setValue('This is the image path');
      fixture.detectChanges();
      const saveButton =fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
      saveButton.click();
      fixture.detectChanges();
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });
  });
});
