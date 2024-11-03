import { Component, ViewContainerRef } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormComponent } from '../../../shared/components/form/form.component';
import { HttpClient } from '@angular/common/http';
import { SubscriptionLike } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormComponent, CommonModule],
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
  constructor(private http: HttpClient, private vcr: ViewContainerRef) {}

  onSubmit() {
    if (
      this.registerForm.valid &&
      this.registerForm.value.password ===
        this.registerForm.value.confirmPassword
    ) {
      this.subscription = this.http
        .post('http://localhost:3000/register', this.registerForm.value)
        .subscribe({
          next: (response) => {
            console.log(response);
            this.registerForm.reset();
            this.vcr
              .createComponent(ModalComponent)
              .setInput('message', 'Registration successful');
          },
          error: (error) => {
            this.registerForm
              .get('username')
              ?.setErrors({ invalid: true, serverError: error.error.message });
            this.registerForm.get('username')?.markAsTouched();
          },
        });
    } else {
      console.log('Passwords do not match');
      this.registerForm
        .get('confirmPassword')
        ?.setErrors({ invalid: true, serverError: 'Passwords do not match' });
      this.registerForm.get('confirmPassword')?.markAsTouched();
      this.registerForm
        .get('password')
        ?.setErrors({ invalid: true, serverError: 'Passwords do not match' });
      this.registerForm.get('password')?.markAsTouched();
    }
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
