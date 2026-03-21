import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { IUser } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);

  baseUrl = 'https://localhost:5001/api/';
  currentUser = signal<IUser | null>(null);

  login(creds: any) {
    return this.http.post<IUser>(this.baseUrl + 'account/login', creds).pipe(
      tap((user) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser.set(user);
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
