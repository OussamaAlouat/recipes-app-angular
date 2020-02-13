import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms'

import { ShoppingEditComponent } from './shopping-edit.component';
import { ShoppingListService } from '../shopping-list.service';
import { ButtonComponent } from 'src/app/shared/button/button.component';

describe('ShoppingEditComponent', () => {
  let component: ShoppingEditComponent;
  let fixture: ComponentFixture<ShoppingEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingEditComponent, ButtonComponent ],
      imports: [ HttpClientTestingModule, ReactiveFormsModule ],
      providers: [ShoppingListService]
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
});
