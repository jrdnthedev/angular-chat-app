import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { RegisterComponent } from './core/components/register/register.component';
import { LoginComponent } from './core/components/login/login.component';
import { ChatComponent } from './features/chat/chat.component';

export const routes: Routes = [
  {
    component: HomeComponent,
    path: '',
  },
  {
    component: RegisterComponent,
    path: 'register',
  },
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: ChatComponent,
    path: 'chat',
  },
];
