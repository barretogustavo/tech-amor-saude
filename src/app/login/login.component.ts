import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth-service';
import { Router } from '@angular/router';

interface LoginResponse {
  id: number;
  username: string;
  password: string;
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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}

  login() {
    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe(
      (response: LoginResponse) => {
        // Lógica de sucesso de login
        console.log('Login bem-sucedido: ', response);
        this.router.navigate(['/home']); // Redireciona para a página /home
      },
      (error) => {
        // Lógica de tratamento de erro de login
        console.error('Erro no login', error);
        this.error =
          'Dados incorretos. Por favor, revise seus dados e tente novamente.';
      }
    );
  }
}
