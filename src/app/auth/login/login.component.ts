import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ONLY_LETTER_AND_NUMBERS} from '../constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form!: FormGroup;

  constructor(private _authService: AuthService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(ONLY_LETTER_AND_NUMBERS)
        ]),
    })
  }

  public login(e: Event) {
    e.preventDefault();
    this._authService.login(this.form.value);
  }
}
