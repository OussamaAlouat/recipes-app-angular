import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent implements OnInit {
  @Input() type: string;
  @Input() disable: boolean;
  @Input() styleClass: string;

  @Output() clicked: EventEmitter<void>;
  constructor() {
    this.clicked = new EventEmitter();
  }

  ngOnInit() {}

  onClick() {
    this.clicked.emit();
  }
}
