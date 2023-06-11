import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Entity } from '../../models';
import { EntityState, StoreEntity } from '../../state/entity/entity.state';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SpecialtiesModalComponent } from 'src/app/components/specialties-modal/specialties-modal.component';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
})
export class EntityViewComponent implements OnInit {
  @Select(EntityState.getEntity) entity$!: Observable<Entity | null>;

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const entityIdParam = this.route.snapshot.paramMap.get('id');
    this.entity$.subscribe((entity) => {
      if (!entity && entityIdParam) {
        this.fetchEntityFromAPI(entityIdParam);
      }
    });
  }

  fetchEntityFromAPI(entityId: string) {
    this.http
      .get<Entity>(`http://localhost:3000/entity/${entityId}`)
      .pipe(
        catchError((error) => {
          console.error('Erro ao obter a entidade:', error);
          this.router.navigate(['/home']);
          return [];
        })
      )
      .subscribe((data) => {
        this.store.dispatch(new StoreEntity(data));
      });
  }

  openSpecialtiesModal() {
    this.entity$.subscribe((entity) => {
      if (entity) {
        this.dialog.open(SpecialtiesModalComponent, {
          data: { specialties: entity.specialties },
        });
      }
    });
  }

  getFormattedSpecialties(specialties: string[]): string {
    return specialties.slice(0, 5).join(', ');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear());

    return `${day}/${month}/${year}`;
  }
}
