import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { EntityViewComponent } from './components/entity-view/entity-view.component';
import { CreateEntityComponent } from './components/create-entity/create-entity.component';
import { AuthGuard } from '../services/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'entity/:id',
    component: EntityViewComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create',
    component: CreateEntityComponent,
    canActivate: [AuthGuard],
  },
  { path: 'edit', component: CreateEntityComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
