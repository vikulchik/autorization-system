import { Injectable } from '@angular/core';

export enum LocalStorageKey {
  loggedInUser = 'loggedInUser',
  users = 'users'
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set<T>(key: string, value: T) {
    return localStorage.setItem(key, JSON.stringify(value))
  }

  get<T>(key: string): T | null {
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
