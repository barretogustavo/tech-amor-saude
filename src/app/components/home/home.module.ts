import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EntityViewModule } from '../entity-view/entity-view.module';
import { SpecialtiesModalModule } from 'src/app/specialties-modal/specialties-modal.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    MenuModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    EntityViewModule,
    MatFormFieldModule,
    MatPaginatorModule,
    SpecialtiesModalModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
