import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HeaderComponent } from './header.component';
import { RecipeService } from '../recipes/recipe.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { By } from '@angular/platform-browser';
import { MockRecipeService } from 'src/__mocks__/RecipeService.component';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../auth/user.model';

class AuthServiceMock {
  public user: BehaviorSubject<User>;
  constructor() {
    this.user = new BehaviorSubject(null);
  }

  logout() {
    return;
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        {
          provide: RecipeService,
          useClass: MockRecipeService
        },
        {
          provide: AuthService,
          useClass: AuthServiceMock
        },
        ShoppingListService ]
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

  describe('Should have been called on functions', () => {
    it('On click on saveData anchor, onSaveData function should have been called', () => {
      spyOn(component, 'onSaveData').and.callThrough();
      const saveDataButton = fixture.debugElement.query(By.css('#saveData')).nativeElement;
      saveDataButton.click();
      fixture.detectChanges();
      expect(component.onSaveData).toHaveBeenCalled();
    });

    it('On click on fetchData, onFetchData function should have been called', () => {
      spyOn(component, 'onFetchData').and.callThrough();
      const saveDataButton = fixture.debugElement.query(By.css('#fetchData')).nativeElement;
      saveDataButton.click();
      fixture.detectChanges();
      expect(component.onFetchData).toHaveBeenCalled();
    });

    it('On click on logout, onLogout function should have been called', () => {
      spyOn(component, 'onLogout').and.callThrough();
      const saveDataButton = fixture.debugElement.query(By.css('#logout')).nativeElement;
      saveDataButton.click();
      fixture.detectChanges();
      expect(component.onLogout).toHaveBeenCalled();
    });
  })
});

