import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormComponent } from '../../../shared/components/form/form.component';
import { HttpClient } from '@angular/common/http';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  subscription!: SubscriptionLike;
  constructor(private http: HttpClient) {}

  onSubmit() {
    if (
      this.registerForm.valid &&
      this.registerForm.value.password ===
        this.registerForm.value.confirmPassword
    ) {
      this.subscription = this.http
        .post('http://localhost:3000/register', this.registerForm.value)
        .subscribe((response) => {
          console.log(response);
        });
      console.log(this.registerForm.value);
    } else {
      console.log('Passwords do not match');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
