import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Entity } from '../models';
import { EntityState } from '../state/entity/entity.state';

@Component({
  selector: 'app-entity-view',
  templateUrl: './entity-view.component.html',
  styleUrls: ['./entity-view.component.css'],
})
export class EntityViewComponent implements OnInit {
  @Select(EntityState.getEntity) entity$!: Observable<Entity | null>;

  constructor() {}

  ngOnInit() {}
}
