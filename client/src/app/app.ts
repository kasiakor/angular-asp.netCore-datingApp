import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AccountService } from '../core/services/account-service';
import { Nav } from '../layout/nav/nav';
import { IUser } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private http = inject(HttpClient);
  protected router = inject(Router);
  private accountService = inject(AccountService);
  protected title = 'Dating app';
  protected members = signal<IUser[]>([]);

  ngOnInit(): void {
    this.http.get<IUser[]>('https://localhost:5001/api/members').subscribe({
      next: (response) => {
        console.log(response);
        this.members.set(response);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => console.log('Request completed'),
    });
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;

    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }
}
