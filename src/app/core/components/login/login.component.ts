import { Component, ViewContainerRef } from '@angular/core';
import { FormComponent } from '../../../shared/components/form/form.component';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { SubscriptionLike } from 'rxjs';
import { StoreService } from '../../services/store/store.service';
import { AuthService } from '../../services/auth/auth.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  subscription!: SubscriptionLike;

  constructor(
    private auth: AuthService,
    private store: StoreService,
    private ref: ViewContainerRef
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username!;
      const password = this.loginForm.value.password!;
      this.subscription = this.auth.login(username, password).subscribe({
        next: (response) => {
          console.log(response);
          this.auth.setToken(response.token);
          this.store.setUser({
            username: username,
            password: password,
            isLoggedIn: true,
            token: response.token,
          });
        },
        error: (error) => {
          // Handle the error here
          const modal = this.ref.createComponent(ModalComponent);
          modal.setInput('message', error.error.message);
        },
        complete: () => {
          // Optional: Handle completion if necessary
          console.log('Login request completed');
        },
      });
    }
    this.loginForm.reset();
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
