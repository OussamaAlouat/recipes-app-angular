import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormArray, FormControl } from '@angular/forms';
import { RecipeEditComponent } from './recipe-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RecipeService } from '../recipe.service';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { RecipeStorageService } from '../recipe.storage.service';
import { ShoppingListStorageService } from 'src/app/shopping-list/shopping-list.storage.service';

import { FormInputComponent } from 'src/app/shared/form/form-input/form-input.component';
import { FormTextAreaComponent } from 'src/app/shared/form/form-text-area/form-text-area.component';
import { FormCheckboxesComponent } from 'src/app/shared/form/form-checkboxes/form-checkboxes.component';
import { ButtonComponent } from 'src/app/shared/button/button.component';

// Function needed to validate checkboxes
export function minSelectedCheckboxes (formArray: FormArray): {required: boolean} | null {
  const totalSelected = formArray.controls
    .map(control => control.value)
    .reduce((prev, next) => next ? prev + next : prev, 0);
  return totalSelected >= 1 ? null : { required: true };
}

describe('RecipeEditComponent', () => {
  let component: RecipeEditComponent;
  let fixture: ComponentFixture<RecipeEditComponent>;
  const validTypes = [
    false,
    true,
    false,
    false
  ];

  let mockRouter:any;
  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(async(() => {
    mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      declarations: [
        RecipeEditComponent,
        FormInputComponent,
        FormTextAreaComponent,
        FormCheckboxesComponent,
        ButtonComponent,
      ],
      providers: [
        RecipeService,
        RecipeStorageService,
        ShoppingListService,
        ShoppingListStorageService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id : null})
          }
        },
        {
          provide: Router, useValue: mockRouter,
        }
      ],
      imports: [ ReactiveFormsModule, HttpClientTestingModule ]
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
      expect(component.recipeForm.valid).toBeFalsy()
      expect(component.recipeForm.controls.name.valid).toBeFalsy();
    });

    it('The input imagePath is empty, imagePath should be not valid', () => {
      component.recipeForm.controls.imagePath.setValue(null);
      expect(component.recipeForm.valid).toBeFalsy();
      expect(component.recipeForm.controls.imagePath.valid).toBeFalsy();
    });

    it('The input description is empty, description should be not valid', () => {
      component.recipeForm.controls.description.setValue(null);
      expect(component.recipeForm.valid).toBeFalsy();
      expect(component.recipeForm.controls.description.valid).toBeFalsy();
    });

    it('The checkboxed typeOfRecipe is not selected, typeOfRecipe should be not valid', fakeAsync(() => {
      const data = [false, false, false, false];
      const formArray = (<FormArray>component.recipeForm.get('typeOfRecipe'));
      component.recipeForm.controls.typeOfRecipe.setValidators(minSelectedCheckboxes);

      data.forEach((o) => {
        const control = new FormControl(false);
        formArray.push(control);
      })

      tick();
      fixture.detectChanges();
      expect(component.recipeForm.valid).toBeFalsy();
      expect(component.recipeForm.controls.typeOfRecipe.valid).toBeFalsy();
    }));
  });

  describe('The form elements should be valid, when', () => {
    it('The name elemet have content', () => {
      component.recipeForm.controls.name.setValue('Name test');
      expect(component.recipeForm.controls.name.valid).toBeTruthy();
    });

    it('The description elemet have content', () => {
      component.recipeForm.controls.description.setValue('description test');
      expect(component.recipeForm.controls.description.valid).toBeTruthy();
    });

    it('The imagePath elemet have content', () => {
      component.recipeForm.controls.imagePath.setValue('image');
      expect(component.recipeForm.controls.imagePath.valid).toBeTruthy();
    });

    it('The typeOfRecipe elemet have one element selected', () => {
      const data = [false, true, false, false];
      const formArray = (<FormArray>component.recipeForm.get('typeOfRecipe'));
      component.recipeForm.controls.typeOfRecipe.setValidators(minSelectedCheckboxes);
      data.forEach((o, i) => {
        const control = new FormControl(i === 1 ? true : false);
        formArray.push(control);
      });

      expect(component.recipeForm.controls.typeOfRecipe.valid).toBeTruthy();
    });
  });

  describe('Form should be valid when', () => {
    it('All form elements are not empty', () => {
      component.recipeForm.controls.name.setValue('Tests');
      component.recipeForm.controls.description.setValue('Description test');
      component.recipeForm.controls.imagePath.setValue('This is the image path');
      component.recipeForm.controls.typeOfRecipe.setValue(validTypes);
      fixture.detectChanges();
      const saveButton =fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
      expect(saveButton.disabled).toBeFalsy();
    });
  });

  describe('When submit the form', () => {
    it('onSubmit function should be called', () => {
      spyOn(component, 'onSubmit').and.callThrough();
      component.recipeForm.controls.name.setValue('Tests');
      component.recipeForm.controls.description.setValue('Description test');
      component.recipeForm.controls.imagePath.setValue('This is the image path');
      component.recipeForm.controls.typeOfRecipe.setValue(validTypes);
      fixture.detectChanges();
      const saveButton =fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
      saveButton.click();
      fixture.detectChanges();
      expect(component.onSubmit).toHaveBeenCalledTimes(1);
    });

    it('redirectToRecipes function should be called', fakeAsync(() => {
      spyOn(component , 'redirectToRecipes').and.callThrough();
      component.recipeForm.controls.name.setValue('Tests');
      component.recipeForm.controls.description.setValue('Description test');
      component.recipeForm.controls.imagePath.setValue('This is the image path');
      component.recipeForm.controls.typeOfRecipe.setValue(validTypes);
      fixture.detectChanges();
      const saveButton =fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
      saveButton.click();
      fixture.detectChanges();
      expect(component.redirectToRecipes).toHaveBeenCalledTimes(1);
      expect(mockRouter.navigate).toHaveBeenCalled();
    }));
  });

  describe('On click cancel', () => {
    it('onCancel should have been called and on redirectToRecipes too', () => {
      spyOn(component , 'onCancel').and.callThrough();
      spyOn(component , 'redirectToRecipes').and.callThrough();
      const cancelButton =fixture.debugElement.query(By.css('button.btn.btn-danger')).nativeElement;
      cancelButton.click();
      fixture.detectChanges();
      expect(component.onCancel).toHaveBeenCalledTimes(1);
      expect(component.redirectToRecipes).toHaveBeenCalledTimes(1);
    });
  });

  describe('On click on add ingredients', () => {
    it('Should onAddIngredient() have been called', () => {
      spyOn(component, 'onAddIngredient').and.callThrough();
      const addIBtn = fixture.debugElement.query(By.css('#addIngredient > button')).nativeElement;
      addIBtn.click();
      fixture.detectChanges();
      expect(component.onAddIngredient).toHaveBeenCalled();
    });
  });
});
