import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MenuModule } from '../menu/menu.module';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';

import { EntityViewComponent } from './entity-view.component';

@NgModule({
  declarations: [EntityViewComponent],
  imports: [
    CommonModule,
    MenuModule,
    MatButtonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [EntityViewComponent],
})
export class EntityViewModule {}
