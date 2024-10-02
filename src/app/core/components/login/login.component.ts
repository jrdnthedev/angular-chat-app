import { Component } from '@angular/core';
import { FormComponent } from '../../../shared/components/form/form.component';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SubscriptionLike } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.subscription = this.http
        .post('http://localhost:3000/login', this.loginForm.value)
        .subscribe((response) => {
          console.log(response);
        });
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
