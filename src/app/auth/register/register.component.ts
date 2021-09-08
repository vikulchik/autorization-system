import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {ONLY_LETTER_AND_NUMBERS} from '../constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern(ONLY_LETTER_AND_NUMBERS)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.pattern( ONLY_LETTER_AND_NUMBERS),
        this.validateConfirmPassword()

      ]),
      phone: new FormControl('', [
        Validators.required,
      ])
    })
  }

  public register(e: Event) {
    e.preventDefault();

    this._authService.register(this.form.value);
    this.form.reset();
  }

  validateConfirmPassword(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      return this.form.value.password === value
        ? null
        : {notSame:true}
    }
  }

}
