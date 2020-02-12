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
    ></app-form-input>
  `,
})
class HostComponent {
  @ViewChild(FormInputComponent, { static: true })
  child: FormInputComponent;
  label: string;
  controlName: string;
  controlledBy: FormGroup;
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
    expect(component.controlledBy.valid).toBe(false);
    expect(component.controlledBy.controls.name.valid).toBe(false);
    expect(hostComponent.controlledBy.valid).toBe(false);
    expect(hostComponent.controlledBy.controls.name.valid).toBe(false);
  });

  it('The form input have data, should be valid', () => {
    component.controlledBy.controls.name.setValue('Test');
    fixture.detectChanges();
    expect(hostComponent.controlledBy.valid).toBe(true);
    expect(hostComponent.controlledBy.controls.name.valid).toBe(true);
    expect(component.controlledBy.controls.name.valid).toBe(true);
  });

  it('On invalid input, the class "ng-invaid" should appear', () => {
    component.controlledBy.controls.name.setValue(null);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const classes = compiled.querySelector('input').className;
    expect(classes).toContain('ng-invalid');
  });
});