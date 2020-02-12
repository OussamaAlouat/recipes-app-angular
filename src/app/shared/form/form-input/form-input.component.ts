import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {
  @Input() label: string;
  @Input() controlledBy: FormGroup;
  @Input() controlName: string;
  constructor() {}

  ngOnInit() {}
}
