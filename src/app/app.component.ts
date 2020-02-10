import { Component, OnInit } from '@angular/core';
import { LoggingService } from './logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angularBasics';
  constructor(
    //private authService: AuthService,
    private loggingService: LoggingService,
  ) {}

  ngOnInit() {
    // this.authService.autologin();
    this.loggingService.printLog('Hello from AppComponent ngOnInit');
  }
}
