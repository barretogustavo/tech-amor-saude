import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { regionsList, specialtiesList } from 'src/app/helpers';
import { Entity } from 'src/app/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import {
  StoreEntity,
  UpdateEntity,
  EntityState,
} from 'src/app/state/entity/entity.state';

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

  isEditMode = false;
  regionsList = regionsList;
  specialtiesList = specialtiesList;

  constructor(
    private store: Store,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.url.subscribe((url) => {
      this.isEditMode = url[url.length - 1].path === 'edit';
      if (this.isEditMode) {
        const entity = this.store.selectSnapshot(EntityState.getEntity);
        if (entity) {
          this.entity = { ...entity };
        } else {
          this.router.navigate(['/home']);
        }
      }
    });
  }

  formatCnpj() {
    let cnpj = this.entity.cnpj.replace(/\D/g, '');

    if (cnpj.length <= 14) {
      cnpj = cnpj.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
        '$1.$2.$3/$4-$5'
      );
    }

    this.entity.cnpj = cnpj;
  }

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
      if (this.isEditMode) {
        this.http
          .put('http://localhost:3000/entity/' + this.entity.id, this.entity)
          .subscribe(
            () => {
              this.store.dispatch(new UpdateEntity(this.entity));
              this.router.navigate(['/entity']);
            },
            (error) => {
              console.error('Erro ao atualizar a entidade:', error);
            }
          );
      } else {
        this.http.post('http://localhost:3000/entity', this.entity).subscribe(
          () => {
            this.store.dispatch(new StoreEntity(this.entity));
            this.router.navigate(['/entity']);
          },
          (error) => {
            console.error('Erro ao criar a entidade:', error);
          }
        );
      }
    } else {
      console.error(
        'Formulário inválido. Preencha todos os campos obrigatórios.'
      );
    }
  }
}
