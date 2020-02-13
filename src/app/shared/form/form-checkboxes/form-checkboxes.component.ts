import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-form-checkboxes',
  templateUrl: './form-checkboxes.component.html',
  styleUrls: ['./form-checkboxes.component.scss']
})
export class FormCheckboxesComponent implements OnInit {
  @Input() controlledBy: FormGroup;
  @Input() controlName: string;
  @Input() types: string [];
  constructor() {
  }

  ngOnInit() {
    this.addCheckboxes();
    this.controlledBy.controls.typeOfRecipe.setValidators(this.minSelectedCheckboxes);
  }

  private addCheckboxes() {
    const formArray = (<FormArray>this.controlledBy.get('typeOfRecipe'));
    this.types.forEach((o, i) => {
      const control = new FormControl(false);
      formArray.push(control);
    });
  }

  private minSelectedCheckboxes (formArray: FormArray): {required: boolean} | null {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);
    return totalSelected >= 1 ? null : { required: true };
  }

  get typeOfRecipeGetter() {
    return (<FormArray>this.controlledBy.get('typeOfRecipe')).controls;
  }
}
