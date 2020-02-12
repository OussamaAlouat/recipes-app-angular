import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-text-area',
  templateUrl: './form-text-area.component.html',
  styleUrls: ['./form-text-area.component.scss']
})
export class FormTextAreaComponent implements OnInit {
  @Input() label: string;
  @Input() controlledBy: FormGroup;
  @Input() controlName: string;
  constructor() {}

  ngOnInit() {}
}
