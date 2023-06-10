import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { SpecialtiesModalComponent } from './specialties-modal.component';

@NgModule({
  declarations: [SpecialtiesModalComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  exports: [SpecialtiesModalComponent],
})
export class SpecialtiesModalModule {}
