import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularBasics';

  public feature: string;

  constructor() {
    this.feature = 'recipe';
  }

  onNavigate(feature: string) {
    this.feature = feature;
    console.log('feature: ', feature);
  }
}
