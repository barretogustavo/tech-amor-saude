import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Entity } from 'src/app/models';

export class StoreEntity {
  static readonly type = '[Entity] Store';
  constructor(public payload: Entity) {}
}

export class ClearEntity {
  static readonly type = '[Entity] Clear';
}

export class UpdateEntity {
  static readonly type = '[Entity] Update';
  constructor(public payload: Entity) {}
}

@State<Entity | null>({
  name: 'entity',
  defaults: null,
})
@Injectable()
export class EntityState {
  @Selector()
  static getEntity(state: Entity | null) {
    return state;
  }

  @Action(StoreEntity)
  storeEntity(ctx: StateContext<Entity | null>, { payload }: StoreEntity) {
    ctx.setState(payload);
  }

  @Action(ClearEntity)
  clearEntity(ctx: StateContext<Entity | null>) {
    ctx.setState(null);
  }

  @Action(UpdateEntity)
  updateEntity(ctx: StateContext<Entity | null>, { payload }: UpdateEntity) {
    const state = ctx.getState();
    if (state !== null && state.id === payload.id) {
      ctx.setState(payload);
    }
  }
}
