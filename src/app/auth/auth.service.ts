import {Injectable} from '@angular/core';
import {LocalStorageKey, LocalStorageService} from '../services/local-storage.service';
import {User} from './interfaces';
import {Router} from '@angular/router';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: User | null = null;

  constructor(private _localStorage: LocalStorageService, private _router: Router) {
    const loggedInUserEmail = this._localStorage.get(LocalStorageKey.loggedInUser);

    if (loggedInUserEmail) {
      this._user = this.getAllUsers()?.find(user => user.email === loggedInUserEmail) || null;
    }
  }

  public login(loginFormData: LoginFormData) {
    const allUsers = this.getAllUsers();
    const existingUser = allUsers?.find(
      user => user.email === loginFormData.email && user.password === loginFormData.password
    );

    if (existingUser) {
      this.createSession(existingUser)
      this._router.navigateByUrl('/homepage');
    } else {
      alert('Sorry, email or password are wrong');
    }
  }

  public register(registerData: RegisterFormData) {
    const allUsers = this.getAllUsers();
    const newUser = {
      email: registerData.email,
      password: registerData.password,
      phone: registerData.phone,
    };

    if (allUsers === null) {
      this._localStorage.set(LocalStorageKey.users, [newUser]);
      this.createSession(newUser);
      this._router.navigateByUrl('/homepage');
    } else {
      const existingUser = allUsers.find(user => user.email === newUser.email);

      if (existingUser) {
        const msg = `User with "${newUser.email}" email is exist`;
        alert(msg);
        throw new Error(msg);
      } else {
        allUsers.push(newUser);
        this.createSession(newUser)
        this._router.navigateByUrl('/homepage');
        this._localStorage.set(LocalStorageKey.users, allUsers);
      }
    }
  }

  public isLoggedIn() {
    return Boolean(this._user);
  }

  public logout() {
    this._user = null;
    this._localStorage.remove('loggedInUser');
    this._router.navigateByUrl('/auth/login');
  }

  public getUserInfo() {
    return this._user;
  }

  private getAllUsers(): User[] | null {
    return this._localStorage.get<User[]>(LocalStorageKey.users);
  }

  private createSession(user: User) {
    this._user = user;
    this._localStorage.set(LocalStorageKey.loggedInUser, user.email);
  }
}
