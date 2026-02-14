import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  profileForm!: FormGroup;
  currentUser = this.authService.getUser();

  ngOnInit() {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    if (this.currentUser) {
      this.profileForm.patchValue({
        firstName: this.currentUser.firstName,
        lastName: this.currentUser.lastName,
        email: this.currentUser.email
      });
    }
  }

  onSave() {
    if (this.profileForm.valid && this.currentUser) {
      const updatedData = { ...this.currentUser, ...this.profileForm.value };
      this.authService.updateUser(updatedData).subscribe({
        next: () => alert('Profile updated successfully!'),
        error: () => alert('An error occurred while updating.')
      });
    }
  }

  onDeleteAccount() {
    if (confirm('Are you sure you want to permanently delete your account? This action cannot be undone.')) {
      this.authService.deleteAccount(String(this.currentUser!.id)).subscribe(() => {
        alert('Account deleted successfully.');
        this.router.navigate(['/login']);
      });
    }
  }
}