import { Store } from '@ngxs/store';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Entity } from 'src/app/models';
import { StoreEntity } from 'src/app/state/entity/entity.state';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SpecialtiesModalComponent } from 'src/app/components/specialties-modal/specialties-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  entity: Entity[] = [];
  filteredEntity: Entity[] = [];
  searchText: string = '';
  searchTimeout: any;
  currentPage = 1;
  entitiesPerPage = 4;
  totalEntities: number = 0;
  sortColumn: string = '';
  sortDirection: string = '';

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.searchText = params['searchText'] || '';
      this.currentPage = +params['page'] || 1;
      this.entitiesPerPage = +params['limit'] || 4;
      this.sortColumn = params['_sort'] || '';
      this.sortDirection = params['_order'] || '';
      this.fetchEntity();
      this.getTotalEntity();
    });
  }

  storeEntityData(entity: Entity) {
    this.store.dispatch(new StoreEntity(entity));
    this.router.navigate([`/entity/${entity.id}`]);
  }

  onEditEntity(entity: Entity) {
    this.store.dispatch(new StoreEntity(entity));
    this.router.navigate(['/edit']);
  }

  getTotalEntity() {
    this.http
      .get<Entity[]>('http://localhost:3000/entity')
      .subscribe((data) => {
        this.totalEntities = data.length;
      });
  }

  fetchEntity() {
    const params = {
      _page: this.currentPage,
      _limit: this.entitiesPerPage,
      companyName_like: this.searchText,
      _sort: this.sortColumn,
      _order: this.sortDirection,
    };

    this.http
      .get<Entity[]>('http://localhost:3000/entity', { params })
      .subscribe((data) => {
        this.entity = data;
        this.filteredEntity = data;
      });
  }

  searchUsers() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.currentPage = 1;
      this.fetchEntity();
      this.updateQueryParams();
    }, 300);
  }

  clearSearch() {
    this.searchText = '';
    this.searchUsers();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.entitiesPerPage = event.pageSize;
    this.fetchEntity();
    this.updateQueryParams();
  }

  updateQueryParams() {
    const queryParams: Params = {
      ['searchText']: this.searchText,
      ['page']: this.currentPage,
      ['limit']: this.entitiesPerPage,
      ['_sort']: this.sortColumn,
      ['_order']: this.sortDirection,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  onColumnHeaderClick(columnName: string) {
    if (this.sortColumn === columnName) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = columnName;
      this.sortDirection = 'asc';
    }

    this.fetchEntity();
  }

  openSpecialtiesModal(specialties: string[]) {
    this.dialog.open(SpecialtiesModalComponent, {
      data: { specialties: specialties },
    });
  }

  getFormattedSpecialties(specialties: string[]): string {
    return specialties.slice(0, 5).join(', ');
  }
}
