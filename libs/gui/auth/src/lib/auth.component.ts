import { Component, OnInit } from '@angular/core';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { ValidationErrors, Validators } from '@angular/forms';
import { fadeInOut } from '@stockeer/gui/ui-components';

type AuthForm = {
  username: string;
  password: string;
  repeatPassword: string;
  action: 'register' | 'login';
};

@Component({
  selector: 'stockeer-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [fadeInOut],
})
export class AuthComponent implements OnInit {
  form?: FormGroup<ControlsOf<AuthForm>>;

  ngOnInit(): void {
    this.form = new FormGroup<ControlsOf<AuthForm>>(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        repeatPassword: new FormControl('', []),
        action: new FormControl('login'),
      },
      [() => this.#repeatPasswordValidator()]
    );
  }

  #repeatPasswordValidator(): ValidationErrors | null {
    if (!this.form) return null;
    const { password, repeatPassword, action } = this.form.controls;

    let error = null;
    if (
      action.value === 'register' &&
      (!repeatPassword.value || password.value !== repeatPassword.value)
    ) {
      error = {
        repeatPassword: true,
      };
    }

    repeatPassword.setErrors(error);

    return null;
  }

  isLogin() {
    return this.form?.controls.action.value === 'login';
  }

  submit() {
    if (!this.form) return;
    this.form.markAllAsTouched();
    this.form.markAllAsDirty();
    if (!this.form.valid) {
      return;
    }
  }
}
