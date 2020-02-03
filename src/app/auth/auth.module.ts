import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModue } from '../shared/shared.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    SharedModue,
    RouterModule.forChild([
      { path: '', component: AuthComponent }
    ]),
  ]
})
export class AuthModule {}
