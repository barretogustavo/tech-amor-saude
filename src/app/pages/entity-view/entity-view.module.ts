import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MenuModule } from 'src/app/components/menu/menu.module';

import { EntityViewComponent } from './entity-view.component';

@NgModule({
  declarations: [EntityViewComponent],
  imports: [
    MenuModule,
    CommonModule,
    RouterModule,
    MatButtonModule,
    HttpClientModule,
  ],
  exports: [EntityViewComponent],
})
export class EntityViewModule {}
