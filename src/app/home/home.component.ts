import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

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

  constructor(
    private http: HttpClient,
    private paginatorIntl: MatPaginatorIntl
  ) {}

  ngOnInit() {
    this.fetchEntity();
    this.paginatorIntl.itemsPerPageLabel = 'Itens por página:';
    this.paginatorIntl.nextPageLabel = 'Próxima página';
    this.paginatorIntl.previousPageLabel = 'Página anterior';
    this.paginatorIntl.getRangeLabel = this.customRangeLabel;
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

  customRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 de ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
  };
}
