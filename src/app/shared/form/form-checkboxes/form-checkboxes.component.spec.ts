import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckboxesComponent } from './form-checkboxes.component';
import { Component, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormArray, ReactiveFormsModule, FormControl } from '@angular/forms';

const controlName: string = 'typeOfRecipe';
const types =  [
  { id: 1, name: 'Vegetable' },
  { id: 2, name: 'Meat' },
  { id: 3, name: 'Fruit' },
  { id: 400, name: 'Other' }
];

@Component({
  selector: 'app-test',
  template: `
    <app-form-checkboxes
      [controlledBy]="controlledBy"
      [controlName]="controlName"
      [types]="types"
    ></app-form-checkboxes>
  `,
})

class HostComponent {
  @ViewChild(FormCheckboxesComponent, { static: true })
  child: FormCheckboxesComponent;
  controlName: string;
  controlledBy: FormGroup;
  types:  {id: number, name: string}[];
}

// Function needed to validate checkboxes
export function minSelectedCheckboxes (formArray: FormArray): {required: boolean} | null {
  const totalSelected = formArray.controls
    .map(control => control.value)
    .reduce((prev, next) => next ? prev + next : prev, 0);
  return totalSelected >= 1 ? null : { required: true };
}

describe('FormCheckboxesComponent', () => {
  let component: FormCheckboxesComponent;
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostComponent, FormCheckboxesComponent ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach( async() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    component = hostComponent.child;

    hostComponent.controlName = controlName;
    hostComponent.controlledBy = new FormGroup({
      'typeOfRecipe': new FormArray([]),
    });
    hostComponent.types = types;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form checkboxes should have no valid', () => {
    beforeEach(() => {
      const formArray = (<FormArray>component.controlledBy.get('typeOfRecipe'));
      component.controlledBy.controls.typeOfRecipe.setValidators(minSelectedCheckboxes);
      types.forEach((o) => {
        const control = new FormControl(false);
        formArray.push(control);
      });
    });

    it('Any option of checkboxes are selected', () => {
      expect(component.controlledBy.valid).toBeFalsy();
      expect(component.controlledBy.controls.typeOfRecipe.valid).toBeFalsy();
      expect(hostComponent.controlledBy.valid).toBeFalsy();
      expect(hostComponent.controlledBy.controls.typeOfRecipe.valid).toBeFalsy();
    });
  });
});
