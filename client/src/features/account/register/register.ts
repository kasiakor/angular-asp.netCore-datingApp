import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRegisterCreds, IUser } from '../../../types/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  membersFromHome = input.required<IUser[]>();
  cancelRegister = output<boolean>();

  protected creds = {} as IRegisterCreds;

  register() {
    console.log(this.creds);
  }

  cancel() {
    console.log('cancelled!');
    this.cancelRegister.emit(false);
  }
}
