import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ButtonComponent } from '../button/button.component';
import { Component, ViewChild } from '@angular/core';

import { AlertComponent } from "./alert.component";

const message = 'This is a simple test';

@Component({
  selector: 'app-test',
  template: `
    <app-alert
      [message]="message"
    ></app-alert>
  `,
})

class HostComponent {
  @ViewChild(AlertComponent, { static: true })
  child: AlertComponent;
  message: string;
  constructor(){
    this.message = message;
  }
}

describe('RecipesComponent', () => {
  let hostComponent: HostComponent;
  let component: AlertComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertComponent, ButtonComponent, HostComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    component = hostComponent.child;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('The message that appear should be "This is a simple test', () =>{
    expect(component.message).toEqual(message);
    const compiled = fixture.debugElement.nativeElement;
    const messageAppearedOnHtml = compiled.querySelector('.alert-box').textContent;
    expect(messageAppearedOnHtml).toContain(message);
  });

  it('On click on close button, should emit "close" event', () => {
    spyOn(component.close, "emit");
    const compiled = fixture.debugElement.nativeElement;
    const button = compiled.querySelector('button');
    button.click();
    fixture.detectChanges();
    expect(component.close.emit).toHaveBeenCalled();
  });

  it('On click on div container, should emit "close" event', () => {
    spyOn(component.close, "emit");
    const compiled = fixture.debugElement.nativeElement;
    const div = compiled.querySelector('.backdrop');
    div.click();
    fixture.detectChanges();
    expect(component.close.emit).toHaveBeenCalled();
  });
});
