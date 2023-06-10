import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MenuModule } from 'src/app/components/menu/menu.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EntityViewModule } from '../entity-view/entity-view.module';
import { SpecialtiesModalModule } from 'src/app/components/specialties-modal/specialties-modal.module';

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
