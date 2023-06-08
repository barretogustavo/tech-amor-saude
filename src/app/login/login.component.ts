import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

interface UserData {
  id: number;
  name: string;
  username: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
        alert('Login bem-sucedido');

        this.userService.setAuthenticated(true);
        this.userService
          .getUserDataByUsername(username)
          .subscribe((userData: UserData) => {
            this.userService.setUserData(userData);
            this.router.navigate(['/home']);
          });
      },
      (error) => {
        console.error('Erro no login', error);
        this.error =
          'Dados incorretos. Por favor, revise seus dados e tente novamente.';
      }
    );
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
}
