import { Component, OnInit } from '@angular/core';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { ValidationErrors, Validators } from '@angular/forms';
import { fadeInOut } from '@stockeer/gui/ui-components';

type AuthForm = {
  username: string;
  password: string;
  repeatPassword: string;
};

@Component({
  selector: 'stockeer-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeInOut],
})
export class AuthComponent implements OnInit {
  state: 'register' | 'login' = 'login';

  form?: FormGroup<ControlsOf<AuthForm>>;

  ngOnInit(): void {
    this.form = new FormGroup<ControlsOf<AuthForm>>({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      repeatPassword: new FormControl('', [
        () => this.#repeatPasswordValidator(),
      ]),
    });
  }

  #repeatPasswordValidator(): ValidationErrors | null {
    if (!this.form) return null;
    const { password, repeatPassword } = this.form.controls;
    if (this.state === 'login') return null;

    return password.value === repeatPassword.value
      ? null
      : {
          passwordsMatch: true,
        };
  }
}
