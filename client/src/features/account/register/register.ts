import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';
import { IRegisterCreds } from '../../../types/user';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();

  protected creds = {} as IRegisterCreds;

  register() {
    console.log(this.creds);
    this.accountService.register(this.creds).subscribe({
      next: (response) => {
        console.log(response);
        this.cancel();
      },
      error: (error) => console.log(error),
    });
  }

  cancel() {
    console.log('cancelled!');
    this.cancelRegister.emit(false);
  }
}
