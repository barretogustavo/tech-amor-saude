import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { UserData } from 'src/app/models';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  error: string = '';
  submitted: boolean = false;
  hidePassword: boolean = true;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    if (this.userService.isAuthenticated) {
      this.router.navigate(['/home']);
    }
  }

  login() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      () => {
        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: {
            message: `Logado com sucesso!.`,
          },
        });

        this.userService.setAuthenticated(true);
        this.userService
          .getUserDataByUsername(username)
          .subscribe((userData: UserData) => {
            this.userService.setUserData(userData);
            localStorage.setItem('userData', JSON.stringify(userData));
            this.router.navigate(['/home']);
          });
      },
      () => {
        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: {
            message: `Ocorreu um erro ao tentar logar.`,
          },
        });
        this.error =
          'Dados incorretos. Por favor, revise seus dados e tente novamente.';
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
