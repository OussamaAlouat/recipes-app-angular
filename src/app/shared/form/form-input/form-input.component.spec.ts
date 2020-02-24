import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormInputComponent } from './form-input.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';

const label: string = 'Name';
const controlName: string = 'name';

@Component({
  selector: 'app-test',
  template: `
    <app-form-input
      [label]="label"
      [controlledBy]="controlledBy"
      [controlName]="controlName"
      [type]="type"
    ></app-form-input>
  `,
})

class HostComponent {
  @ViewChild(FormInputComponent, { static: true })
  child: FormInputComponent;
  label: string;
  controlName: string;
  controlledBy: FormGroup;
  type: string;
}

describe('FormInputComponent', () => {
  let component: FormInputComponent;
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostComponent, FormInputComponent ],
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    component = hostComponent.child;

    hostComponent.controlName = controlName;
    hostComponent.controlledBy = new FormGroup({
      'name': new FormControl(null, Validators.required),
    });;
    hostComponent.label = label;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The form input should been not valid ', () => {
    expect(component.controlledBy.valid).toBeFalsy();
    expect(component.controlledBy.controls.name.valid).toBeFalsy();
    expect(hostComponent.controlledBy.valid).toBeFalsy();
    expect(hostComponent.controlledBy.controls.name.valid).toBeFalsy();
  });

  it('The form input have data, should be valid', () => {
    component.controlledBy.controls.name.setValue('Test');
    fixture.detectChanges();
    expect(hostComponent.controlledBy.valid).toBeTruthy();
    expect(hostComponent.controlledBy.controls.name.valid).toBeTruthy();
    expect(component.controlledBy.controls.name.valid).toBeTruthy();
  });

  it('On invalid input, the class "ng-invaid" should appear', () => {
    component.controlledBy.controls.name.setValue(null);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const classes = compiled.querySelector('input').className;
    expect(classes).toContain('ng-invalid');
  });

  it('The type of the input should be number', () => {
    hostComponent.type = 'number';
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const type = compiled.querySelector('input').type;
    expect(type).toContain('number');
  });

  it('When type property is undefined, the form-input should have a text type', () => {
    const compiled = fixture.debugElement.nativeElement;
    const type = compiled.querySelector('input').type;
    expect(type).toContain('text');
  });
});
