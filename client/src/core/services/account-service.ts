import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { IRegisterCreds, IUser } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<IUser | null>(null);

  setCurrentUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
  }

  register(creds: IRegisterCreds) {
    return this.http.post<IUser>(this.baseUrl + 'account/register', creds).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  login(creds: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', creds).pipe(
      tap((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      }),
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}

//   login(creds: { email: string; password: string }) {
//   return this.http.post(this.baseUrl + 'account/login', creds);
// }
