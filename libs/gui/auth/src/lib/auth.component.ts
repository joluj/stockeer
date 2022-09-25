import { Component, OnInit } from '@angular/core';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';

type AuthForm = {
  username: string;
  password: string;
  repeatPassword: string;
};

@Component({
  selector: 'stockeer-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  state: 'register' | 'login' = 'login';

  form: FormGroup<ControlsOf<AuthForm>>;

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
      repeatPassword: new FormControl('', []),
    });
  }
}
