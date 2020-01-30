import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VariablesNeeded } from 'variables';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({ providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient, private variables: VariablesNeeded){}
  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.variables.firebaseKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(catchError(err => {
      let errorMessage = 'An uknown error occurred';
      if (!err.error || !err.error.error) {
        return throwError(errorMessage);
      }

      switch(err.error.message){
        case 'EMAIL_EXISTS':
          errorMessage  = 'This email exists already';
      }

      return throwError(errorMessage);
    }));
  }
}
