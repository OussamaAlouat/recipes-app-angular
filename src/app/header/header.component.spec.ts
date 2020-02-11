import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeaderComponent } from './header.component';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [ RecipeService, ShoppingListService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Navbar should have some anchors', () => {
    it('Should contains an anchor with "Recipe book" as title', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.navbar-brand').textContent).toContain('Recipe book');
    });

    it('Should contains an anchor with "Recipes" as title', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('a[href$="/recipes"').textContent).toContain('Recipes');
    });

    it('Should contains an anchor with "Authenticate" as title', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('a[href$="/auth"').textContent).toContain('Authenticate');
    });

    it('Should contains an anchor with "Shopping List" as title', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('a[href$="/shopping-list"').textContent).toContain('Shopping List');
    });

    it('Should contains an anchor with "Manage" as title', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.dropdown-toggle').textContent).toContain('Manage');
    });

    it('Should contains an anchor with "Logout" as title', () => {
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('.nav.navbar-nav.navbar-right > li > a').textContent).toContain('Logout');
    });

    describe('Manage menu should have two anchors', () => {
      it('One anchor should be "Save data', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.dropdown-menu > li').textContent).toContain('Save data');
      });

      it('The other anchor should be "Fetch data', () => {
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('.dropdown-menu li:last-child').textContent).toContain('Fetch data');
      });
    });
  });
});

