import { EntityState } from './state/entity/entity.state';

import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { MenuModule } from './components/menu/menu.module';
import { HomeModule } from './components/home/home.module';
import { LoginModule } from './components/login/login.module';
import { EntityViewModule } from './components/entity-view/entity-view.module';
import { CreateEntityModule } from './components/create-entity/create-entity.module';
import { SpecialtiesModalModule } from './specialties-modal/specialties-modal.module';
import { ConfirmationModalModule } from './components/confirmation-modal/confirmation-modal.module';

import { AppComponent } from './app.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [AppComponent, ToastComponent],
  imports: [
    MenuModule,
    HomeModule,
    LoginModule,
    EntityViewModule,
    AppRoutingModule,
    CreateEntityModule,
    SpecialtiesModalModule,
    ConfirmationModalModule,
    NgxsModule.forRoot([EntityState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
