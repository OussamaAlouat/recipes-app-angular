import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VariablesNeeded } from 'variables';

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
    );
  }
}
