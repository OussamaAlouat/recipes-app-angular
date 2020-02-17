import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { Component, ViewChild } from '@angular/core';

import { RecipeItemComponent } from './recipe-item.component';
import { Recipe } from '../../recipe.model';

// Init the recipe
const name = 'Name';

const image = 'https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2019/02/Cheesy-mince-pasta-bake.jpg';
const recipe = new Recipe(name, 'description', image, [], 'Other');

@Component({
  selector: 'app-test',
  template: `
    <app-recipe-item
      [recipe]="recipe"
      [index]="index"
    ></app-recipe-item>
  `,
})

class HostComponent {
  @ViewChild(RecipeItemComponent, { static: true })
  child: RecipeItemComponent;
  recipe: Recipe ;
  index: number;

  constructor(){
    this.recipe = recipe;
    this.index = 0;
  }
}

describe('RecipeItemComponent', () => {
  let hostComponent: HostComponent;
  let component: RecipeItemComponent;
  let fixture: ComponentFixture<HostComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeItemComponent, HostComponent ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    hostComponent = fixture.componentInstance;
    component = hostComponent.child;
    component.recipe = recipe;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component should have content', () => {
    beforeEach(() => {
      compiled = fixture.debugElement.nativeElement;
    });

    it('Should appear "Name" as recipes name', () => {
      const title = compiled.querySelector('h4').textContent;
      expect(title).toEqual(name);
    });

    it('Should appear "description" as recipes description', () => {
      const description = compiled.querySelector('p').textContent;
      expect(description).toEqual('description');
    });

    it('Should appear an image tag', () => {
      const image = compiled.querySelector('img');
      expect(image.alt).toContain(name);
      expect(image.src.length).toBeGreaterThan(1);
    });
  });
});
