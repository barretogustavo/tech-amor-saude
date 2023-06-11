import { Store } from '@ngxs/store';
import { Component } from '@angular/core';
import { Entity, SelectItem } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityState } from 'src/app/state/entity/entity.state';
import { CreateEntityService } from './services/create-entity.service';
import { ConfirmationModalComponent } from 'src/app/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  providers: [CreateEntityService],
})
export class CreateEntityComponent {
  entity: Entity = this.createEntity.getFormValue();

  isEditMode = false;
  regionsList: SelectItem[] = [];
  specialtiesList: SelectItem[] = [];

  constructor(
    private store: Store,
    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public createEntity: CreateEntityService
  ) {
    this.route.url.subscribe({
      next: (url) => {
        this.isEditMode = url[0].path === 'edit';
      },
    });
  }

  ngOnInit() {
    this.checkEditMode();
    this.fetchRegionList();
    this.fetchSpecialtiesList();
  }

  checkEditMode() {
    if (this.isEditMode) {
      const entity = this.store.selectSnapshot(EntityState.getEntity);
      if (entity) {
        this.createEntity.setFormValue({ ...entity });
        this.entity = { ...this.createEntity.getFormValue() };
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  fetchSpecialtiesList() {
    this.createEntity.getSpecialtiesList().subscribe({
      next: (data) => {
        this.specialtiesList = data;
      },
      error: (error) => {
        console.error('Erro ao obter a lista de especialidades:', error);
      },
    });
  }

  fetchRegionList() {
    this.createEntity.getRegionList().subscribe({
      next: (data) => {
        this.regionsList = data;
      },
      error: (error) => {
        console.error('Erro ao obter a lista de regiões:', error);
      },
    });
  }

  formatCnpj() {
    const cnpjControl = this.createEntity.form.get('cnpj');
    if (cnpjControl && cnpjControl.value) {
      let cnpj = cnpjControl.value.replace(/\D/g, '');

      if (cnpj.length === 14) {
        cnpj = cnpj.replace(
          /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
          '$1.$2.$3/$4-$5'
        );
      }

      cnpjControl.setValue(cnpj);
    }
  }

  openConfirmationModal(id: number, event: Event) {
    event.stopPropagation();

    const dialogRef = this.dialog.open(ConfirmationModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createEntity.deleteEntity(id);
      }
    });
  }
}
