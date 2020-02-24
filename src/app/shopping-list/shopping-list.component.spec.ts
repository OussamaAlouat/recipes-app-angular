import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ButtonComponent } from '../shared/button/button.component';
import { FormInputComponent } from '../shared/form/form-input/form-input.component';

import { ShoppingListService } from './shopping-list.service';
import { ShoppingListStorageService } from './shopping-list.storage.service';

describe('ShoppingListComponent', () => {
  let component: ShoppingListComponent;
  let fixture: ComponentFixture<ShoppingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
        ButtonComponent,
        FormInputComponent
      ],
      providers: [
        ShoppingListService,
        ShoppingListStorageService,
      ],
      imports: [ReactiveFormsModule, HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
