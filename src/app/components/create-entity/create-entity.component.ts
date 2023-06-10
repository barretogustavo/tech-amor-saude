import { Component } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../toast/toast.component';

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
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
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
    const { cnpj, openingDate, companyName, corporateName, specialties } =
      this.entity;

    return !!(
      cnpj &&
      openingDate &&
      companyName &&
      corporateName &&
      specialties.length >= 5
    );
  }

  submitForm() {
    if (this.isFormValid()) {
      const url = this.isEditMode
        ? `http://localhost:3000/entity/${this.entity.id}`
        : 'http://localhost:3000/entity';

      this.http
        .request(this.isEditMode ? 'PUT' : 'POST', url, { body: this.entity })
        .subscribe(
          () => {
            const message = this.isEditMode
              ? 'Entidade atualizada com sucesso!'
              : 'Entidade criada com sucesso!';

            this.snackBar.openFromComponent(ToastComponent, {
              duration: 3000,
              data: { message },
            });

            if (this.isEditMode) {
              this.store.dispatch(new UpdateEntity(this.entity));
            } else {
              this.store.dispatch(new StoreEntity(this.entity));
            }

            this.router.navigate(['/entity']);
          },
          (error) => {
            const errorMessage = this.isEditMode
              ? 'Erro ao tentar atualizar a entidade'
              : 'Erro ao tentar criar a entidade';

            this.snackBar.openFromComponent(ToastComponent, {
              duration: 3000,
              data: { message: `${errorMessage}: ${error.message}` },
            });
          }
        );
    } else {
      this.snackBar.openFromComponent(ToastComponent, {
        duration: 3000,
        data: {
          message: 'Formulário inválido. Preencha todos os campos.',
        },
      });
    }
  }

  deleteEntity(id: number) {
    this.http.delete(`http://localhost:3000/entity/${id}`).subscribe(
      () => {
        this.router.navigate(['/home']);
        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: {
            message: 'Entidade excluída com sucesso!',
          },
        });
      },
      (error) => {
        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: {
            message: `Erro ao tentar excluir a entidade: ${error.message}`,
          },
        });
      }
    );
  }
}
