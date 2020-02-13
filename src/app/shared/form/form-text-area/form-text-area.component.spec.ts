import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextAreaComponent } from './form-text-area.component';
import { Component, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

const label: string = 'Description';
const controlName: string = 'description';

@Component({
  selector: 'app-test',
  template: `
    <app-form-text-area
      [label]="label"
      [controlledBy]="controlledBy"
      [controlName]="controlName"
    ></app-form-text-area>
  `,
})
class HostComponent {
  @ViewChild(FormTextAreaComponent, { static: true })
  child: FormTextAreaComponent;
  label: string;
  controlName: string;
  controlledBy: FormGroup;
}


describe('FormTextAreaComponent', () => {
  let component: FormTextAreaComponent;
  let fixture: ComponentFixture<HostComponent>;
  let hostComponent: HostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTextAreaComponent, HostComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [ReactiveFormsModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    component = hostComponent.child;

    hostComponent.controlName = controlName;
    hostComponent.controlledBy = new FormGroup({
      'description': new FormControl(null, Validators.required),
    });;
    hostComponent.label = label;
    fixture.detectChanges();  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The form textArea should been not valid ', () => {
    expect(component.controlledBy.valid).toBeFalsy();
    expect(component.controlledBy.controls.description.valid).toBeFalsy();
    expect(hostComponent.controlledBy.valid).toBeFalsy();
    expect(hostComponent.controlledBy.controls.description.valid).toBeFalsy();
  });

  it('The form input have data, should be valid', () => {
    component.controlledBy.controls.description.setValue('Test');
    fixture.detectChanges();
    expect(hostComponent.controlledBy.valid).toBeTruthy();
    expect(hostComponent.controlledBy.controls.description.valid).toBeTruthy();
    expect(component.controlledBy.controls.description.valid).toBeTruthy();
  });

  it('On invalid input, the class "ng-invaid" should appear', () => {
    component.controlledBy.controls.description.setValue(null);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const classes = compiled.querySelector('textArea').className;
    expect(classes).toContain('ng-invalid');
  });
});
