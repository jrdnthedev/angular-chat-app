import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { User } from '../../../types/types';

@Injectable({
  providedIn: 'root',
})
export class StoreService extends ComponentStore<User> {
  user!: User;

  constructor() {
    super({
      username: '',
      password: '',
      isLoggedIn: false,
      token: '',
    });
  }

  readonly setUser = this.updater((state, user: User) => user);

  readonly isLoggedIn = this.select((state) => state.isLoggedIn);

  readonly username = this.select((state) => state.username);

  readonly password = this.select((state) => state.password);

  readonly user$ = this.select((state) => state);

  readonly isLoggedIn$ = this.select(
    this.isLoggedIn,
    (isLoggedIn) => isLoggedIn
  );

  readonly username$ = this.select(this.username, (username) => username);
}
