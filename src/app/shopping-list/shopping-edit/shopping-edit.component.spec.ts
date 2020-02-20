import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'

import { ShoppingEditComponent } from './shopping-edit.component';
import { ShoppingListService } from '../shopping-list.service';
import { ButtonComponent } from 'src/app/shared/button/button.component';
import { FormInputComponent } from 'src/app/shared/form/form-input/form-input.component';
import { ShoppingListServiceMock } from '../../../__mocks__/ShoppingListMock.service';
import { By } from '@angular/platform-browser';

describe('ShoppingEditComponent', () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingEditComponent, ButtonComponent, FormInputComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      providers: [
        {
          provide: ShoppingListService, useClass: ShoppingListServiceMock
        },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On click on clear button, onClearForm should have been called',() => {
    spyOn(component, 'onClearForm').and.callThrough();
    const clearButton = fixture.debugElement.query(By.css('.btn.btn-prymary')).nativeElement;
    clearButton.click();
    fixture.detectChanges();
    expect(component.onClearForm).toHaveBeenCalled();
  });

  it('On submit, onSubmit function should have been called', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.shoppingForm.controls.name.setValue('Test');
    component.shoppingForm.controls.amount.setValue(1);
    fixture.detectChanges();
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
    submitButton.click();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  describe('The form is not valid when', () => {
    it('Name or amount property not have any content', () => {
      expect(component.shoppingForm.valid).toBeFalsy();
      expect(component.shoppingForm.controls.amount.valid).toBeFalsy();
      expect(component.shoppingForm.controls.name.valid).toBeFalsy();
    });

    it('Amount is not a number', () => {
      component.shoppingForm.controls.amount.setValue('IS NOT NUMBER');
      expect(component.shoppingForm.controls.amount.valid).toBeFalsy();
      expect(component.shoppingForm.valid).toBeFalsy();
    });

    it('Amount is 0', () => {
      component.shoppingForm.controls.amount.setValue(0);
      expect(component.shoppingForm.controls.amount.valid).toBeFalsy();
      expect(component.shoppingForm.valid).toBeFalsy();
    });

    it('Amount is a negative number', () => {
      component.shoppingForm.controls.amount.setValue(-10);
      expect(component.shoppingForm.controls.amount.valid).toBeFalsy();
      expect(component.shoppingForm.valid).toBeFalsy();
    });

    it('Name is an empty string', () => {
      component.shoppingForm.controls.name.setValue('');
      expect(component.shoppingForm.valid).toBeFalsy();
      expect(component.shoppingForm.controls.name.valid).toBeFalsy();
    });
  });

  describe('Form elements should have been valids when', () => {
    it('Name is a string', () => {
      component.shoppingForm.controls.name.setValue('Test');
      expect(component.shoppingForm.controls.name.valid).toBeTruthy();
    });

    it('Amount have a number equal or greater than 1', () => {
      component.shoppingForm.controls.amount.setValue(1);
      expect(component.shoppingForm.controls.amount.valid).toBeTruthy();
    });

    it('Amount and name have expected data', () => {
      component.shoppingForm.controls.name.setValue('Test');
      component.shoppingForm.controls.amount.setValue(1);
      expect(component.shoppingForm.valid).toBeTruthy();
    });
  });
});
