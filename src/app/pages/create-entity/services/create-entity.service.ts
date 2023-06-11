import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ToastComponent } from 'src/app/components/toast/toast.component';
import { Entity } from 'src/app/models';
import { StoreEntity, UpdateEntity } from 'src/app/state/entity/entity.state';

@Injectable()
export class CreateEntityService {
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private store: Store
  ) {
    this.form = this.buildForm();
  }

  buildForm() {
    return this.fb.group({
      id: [null, Validators.required],
      companyName: [null, Validators.required],
      corporateName: [null, Validators.required],
      cnpj: [null, Validators.required],
      specialties: [null, Validators.minLength(5)],
      region: [null, Validators.required],
      openingDate: [null, Validators.required],
      isActive: [false],
    });
  }

  get valid(): boolean {
    if (this.form.untouched) return false;

    return this.form.valid;
  }

  getFormValue(): Entity {
    return this.form.value;
  }

  setFormValue(data: Entity) {
    this.form.setValue(data);
  }

  getSpecialtiesList() {
    return this.http.get<any[]>('http://localhost:3000/specialtiesList');
  }

  getRegionList() {
    return this.http.get<any[]>('http://localhost:3000/regionsList');
  }

  onDeleteEntity(id: number) {
    return this.http.delete(`http://localhost:3000/entity/${id}`);
  }

  deleteEntity(id: number) {
    this.onDeleteEntity(id).subscribe({
      next: () => {
        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: {
            message: 'Entidade excluída com sucesso!',
          },
        });

        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: {
            message: `Erro ao tentar excluir a entidade: ${error.message}`,
          },
        });
      },
    });
  }

  createEntity() {
    const url = 'http://localhost:3000/entity';

    this.http.post(url, this.getFormValue()).subscribe({
      next: () => {
        const message = 'Entidade criada com sucesso!';

        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: { message },
        });

        this.store.dispatch(new StoreEntity(this.getFormValue()));
        this.router.navigate(['/entity']);
      },
      error: (error) => {
        const errorMessage = 'Erro ao tentar criar a entidade';

        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: { message: `${errorMessage}: ${error.message}` },
        });
      },
    });
  }

  updateEntity() {
    const url = `http://localhost:3000/entity/${this.getFormValue().id}`;

    this.http.put(url, this.getFormValue()).subscribe({
      next: () => {
        const message = 'Entidade atualizada com sucesso!';

        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: { message },
        });

        this.store.dispatch(new UpdateEntity(this.getFormValue()));
        this.router.navigate(['/entity']);
      },
      error: (error) => {
        const errorMessage = 'Erro ao tentar atualizar a entidade';

        this.snackBar.openFromComponent(ToastComponent, {
          duration: 3000,
          data: { message: `${errorMessage}: ${error.message}` },
        });
      },
    });
  }

  submitForm(isEditMode: boolean) {
    if (this.valid) {
      if (isEditMode) {
        this.updateEntity();
      } else {
        this.createEntity();
      }
    } else {
      this.snackBar.openFromComponent(ToastComponent, {
        duration: 3000,
        data: {
          message: 'Formulário inválido. Preencha todos os campos.',
        },
      });
    }
  }
}
