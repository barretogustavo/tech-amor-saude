import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntityViewComponent } from './components/entity-view/entity-view.component';

import { AppComponent } from './app.component';
import { NgxsModule } from '@ngxs/store';
import { EntityState } from './state/entity/entity.state';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateEntityModule } from './components/create-entity/create-entity.module';
import { MenuModule } from './components/menu/menu.module';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ToastComponent,
    EntityViewComponent,
  ],
  imports: [
    MenuModule,
    FormsModule,
    RouterModule,
    BrowserModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    CreateEntityModule,
    NgxsModule.forRoot([EntityState]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
