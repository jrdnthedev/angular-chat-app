import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { StoreService } from './core/services/store/store.service';
import { AuthService } from './core/services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { LoginComponent } from './core/components/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-chat-app';
  isLoggedIn$!: Observable<boolean>;

  username!: string;

  constructor(private store: StoreService, private auth: AuthService) {
    this.isLoggedIn$ = this.store.isLoggedIn$;
    this.store
      .select((state) => state.username)
      .subscribe((username) => {
        this.username = username;
      });
  }

  logout() {
    console.log('Logging out');
    this.auth.logout();
    this.store.setUser({
      username: '',
      password: '',
      isLoggedIn: false,
      token: '',
    });
  }
}
