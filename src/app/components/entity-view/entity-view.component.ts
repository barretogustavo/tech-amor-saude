import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Entity } from '../../models';
import { EntityState, StoreEntity } from '../../state/entity/entity.state';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css'],
})
export class EntityViewComponent implements OnInit {
  @Select(EntityState.getEntity) entity$!: Observable<Entity | null>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
    private http: HttpClient
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
}
