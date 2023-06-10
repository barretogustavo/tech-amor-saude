import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Entity } from 'src/app/models';

@Component({
  selector: 'app-specialties-modal',
  templateUrl: './specialties-modal.component.html',
})
export class SpecialtiesModalComponent {
  otherSpecialties: string[];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Entity) {
    this.otherSpecialties = this.data.specialties;
  }
}
