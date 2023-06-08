import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { regionsList, specialtiesList } from 'src/app/helpers';
import { Entity } from 'src/app/models';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { StoreEntity } from 'src/app/state/entity/entity.state';

@Component({
  selector: 'app-create-entity',
  templateUrl: './create-entity.component.html',
  styleUrls: ['./create-entity.component.css'],
})
export class CreateEntityComponent {
  entity: Entity = {
    id: 0,
    companyName: '',
    corporateName: '',
    cnpj: '',
    specialties: [],
    region: '',
    openingDate: '',
    isActive: false,
  };

  regionsList = regionsList;
  specialtiesList = specialtiesList;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  isFormValid(): boolean {
    if (
      !this.entity.cnpj ||
      !this.entity.openingDate ||
      !this.entity.companyName ||
      !this.entity.corporateName
    ) {
      return false;
    }
    return true;
  }

  submitForm() {
    if (this.isFormValid()) {
      this.http.post('http://localhost:3000/entity', this.entity).subscribe(
        () => {
          this.store.dispatch(new StoreEntity(this.entity));
          this.router.navigate(['/entity']);
        },
        (error) => {
          // Lidar com erros da solicitação
          console.error('Erro ao enviar o formulário:', error);
        }
      );
    } else {
      console.error(
        'Formulário inválido. Preencha todos os campos obrigatórios.'
      );
    }
  }
}
