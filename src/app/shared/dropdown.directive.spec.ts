import { Component, DebugElement } from "@angular/core";
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DropdownDirective } from './dropdown.directive';

@Component({
  selector: 'app-test',
  template: `<li class="dropdown" appDropdown></li>`,
})

class HostComponent {}

describe('DropDown directive', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let liElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, DropdownDirective]
    });

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    liElement = fixture.debugElement.query(By.css('li'));
  });

  it('Should not appear class open', () => {
    const element = liElement.nativeElement;
    expect(element.className).not.toContain('open');
  });

  it('Should appear class open', () => {
    const element = liElement.nativeElement;
    element.click();
    fixture.detectChanges();
    expect(element.className).toContain('open');
  });
});
