import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entity } from 'src/app/models';
import { StoreEntity } from 'src/app/state/entity/entity.state';

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

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.fetchEntity();
  }

  storeEntityData(entity: Entity) {
    this.store.dispatch(new StoreEntity(entity));
    this.router.navigate([`/entity/${entity.id}`]);
  }

  onEditEntity(entity: Entity) {
    this.store.dispatch(new StoreEntity(entity));
    this.router.navigate(['/edit']);
  }

  fetchEntity() {
    this.http
      .get<Entity[]>('http://localhost:3000/entity')
      .subscribe((data) => {
        this.entity = data;
        this.filteredEntity = data;
      });
  }

  searchUsers() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      if (this.searchText === '') {
        this.filteredEntity = this.entity;
        return;
      }

      this.http
        .get<Entity[]>(
          `http://localhost:3000/entity?companyName_like=${this.searchText}`
        )
        .subscribe((data) => {
          this.filteredEntity = data;
        });
    }, 300);
  }
}
