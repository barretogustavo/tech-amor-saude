import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    const userData = localStorage.getItem('userData');

    if (userData) {
      this.userService.setAuthenticated(true);
      this.userService.setUserData(JSON.parse(userData));
    }
  }
}
