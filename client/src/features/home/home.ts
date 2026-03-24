import { Component, Input, signal } from '@angular/core';
import { IUser } from '../../types/user';
import { Register } from '../account/register/register';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  @Input({ required: true }) membersFromApp: IUser[] = [];
  protected registerMode = signal(false);

  showRegister(value: boolean) {
    this.registerMode.set(value);
  }
}
