import { EntityState } from './state/entity/entity.state';

import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './pages/home/home.module';
import { LoginModule } from './pages/login/login.module';
import { MenuModule } from './components/menu/menu.module';
import { ConfirmationModalModule } from './components/confirmation-modal/confirmation-modal.module';

import { AppComponent } from './app.component';
import { ToastComponent } from './components/toast/toast.component';
import { CreateEntityModule } from './pages/create-entity/create-entity.module';
import { EntityViewModule } from './pages/entity-view/entity-view.module';
import { SpecialtiesModalModule } from './components/specialties-modal/specialties-modal.module';

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
