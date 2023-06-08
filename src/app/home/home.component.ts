import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorIntl,
  PageEvent,
} from '@angular/material/paginator';

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
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  entity: Entity[] = [];
  filteredEntity: Entity[] = [];
  searchText: string = '';
  searchTimeout: any;

  constructor(
    private http: HttpClient,
    private paginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit() {
    this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.fetchEntity(pageEvent);
    });
  }

  fetchEntity = (pageEvent: PageEvent) => {
    const pageIndex = pageEvent.pageIndex;
    const pageSize = pageEvent.pageSize;

    this.http
      .get<Entity[]>('http://localhost:3000/entity', {
        params: {
          _limit: pageSize.toString(),
          _page: (pageIndex + 1).toString(),
          name_like: this.searchText,
        },
      })
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
