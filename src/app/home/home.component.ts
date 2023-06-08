import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Entity {
  name: string;
  region: string;
  specialty: string;
  isActive: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  entity: Entity[] = [];
  filteredEntity: Entity[] = [];
  searchText: string = '';
  searchTimeout: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchEntity();
  }

  fetchEntity = () => {
    this.http
      .get<Entity[]>('http://localhost:3000/entity')
      .subscribe((data) => {
        this.entity = data;
        this.filteredEntity = data;
      });
  };

  searchUsers = () => {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (this.searchText === '') {
        this.filteredEntity = this.entity;
        return;
      }

      this.http
        .get<Entity[]>(
          `http://localhost:3000/entity?name_like=${this.searchText}`
        )
        .subscribe((data) => {
          this.filteredEntity = data;
        });
    }, 300);
  };
}
