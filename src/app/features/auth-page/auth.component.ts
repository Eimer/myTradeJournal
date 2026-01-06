import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AuthState } from '../../core/models/auth.model';
import { LoaderService } from '../../core/services/loader.service';

@Component({
  selector: 'auth.component',
  imports: [CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  public loaderService = inject(LoaderService);

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  private _fb = inject(NonNullableFormBuilder);

  public authState: AuthState = { state: 'login' };
  public errorMessage: string | null = null;
  public hidePassword = true;
  private _destroyRef = inject(DestroyRef);
  public authForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    displayName: ['']
  });

  constructor() {
    this._route.url.pipe(takeUntilDestroyed()).subscribe(url => {
      this.authState.state = url[0].path === 'login' ? 'login' : 'register';
      this.updateValidators();
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.authForm.invalid) return;
    this.errorMessage = null;
    const { email, password, displayName } = this.authForm.getRawValue();
    const request$ = this.authState.state === 'login' ? 
    this._authService.signIn(email, password) 
    : this._authService.signUp(email, password, displayName);
    request$.pipe(
      tap(() => {
        this._router.navigate(['/home']);
      }),
      catchError(err => {
        this.errorMessage = err.message || 'Auth error';
        return EMPTY;
      }),
      takeUntilDestroyed(this._destroyRef)
    ).subscribe();
  }

  private updateValidators() {
    const nameControl = this.authForm.controls.displayName;
    this.authState.state === 'login' ? nameControl.clearValidators() : nameControl.setValidators([Validators.required]);
    nameControl.updateValueAndValidity();
  }

}
