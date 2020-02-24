import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ViewChild, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-test-button',
  template: `
    <app-button
      [type]="type"
      [disable]="disable"
      [styleClass]="styleClass"
    ></app-button>
  `,
})

class HostComponent {
  @ViewChild(ButtonComponent, { static: true })
  child: ButtonComponent;
  type: string;
  disable: boolean;
  styleClass: string;

  constructor() {
    this.type = 'submit';
    this.styleClass ='btn btn-success';
    this.disable = true;
  }
}

describe('ButtonComponent', () => {
  let hostcomponent: HostComponent;
  let component: ButtonComponent;
  let fixture: ComponentFixture<HostComponent>;
  let debugCheckbox;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonComponent, HostComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostcomponent = fixture.componentInstance;
    component = hostcomponent.child;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Button component should work', () => {
    beforeEach(() => {
      hostcomponent.disable = false;
      fixture.detectChanges();
      debugCheckbox = fixture.debugElement.query(By.css('button')).nativeElement;
    });

    it('disable option shold been flase', () => {
      expect(component.disable).toBeFalsy();
    });

    it('Should emit an event on click', () => {
      spyOn(component.clicked, 'emit');
      debugCheckbox.click();
      fixture.detectChanges();
      expect(component.clicked.emit).toHaveBeenCalled();
    });
  });

  describe('Button component should not work', () => {
    beforeEach(() => {
      debugCheckbox = fixture.debugElement.query(By.css('button')).nativeElement;
    });

    it('disable option shold been true', () => {
      expect(component.disable).toBeTruthy();
    });

    it('Should not emit an event on click, when disable is true', () => {
      spyOn(component.clicked, 'emit');
      debugCheckbox.click();
      fixture.detectChanges();
      expect(component.clicked.emit).not.toHaveBeenCalled();
    });
  });
});
