import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { FormInputComponent } from './form/form-input/form-input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormTextAreaComponent } from './form/form-text-area/form-text-area.component';
import { FormCheckboxesComponent } from './form/form-checkboxes/form-checkboxes.component';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    FormInputComponent,
    FormTextAreaComponent,
    FormCheckboxesComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule,
    FormInputComponent,
    FormTextAreaComponent,
    FormCheckboxesComponent,
  ],
  entryComponents: [
    AlertComponent,
  ]
})
export class SharedModue{}
