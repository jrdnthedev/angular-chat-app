import { Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { RegisterComponent } from './core/components/register/register.component';
import { LoginComponent } from './core/components/login/login.component';
import { ChatRoomComponent } from './features/chat-room/chat-room.component';

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
    component: ChatRoomComponent,
    path: 'chat-room/:roomId',
  },
];
