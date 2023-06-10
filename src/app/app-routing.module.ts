import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from '../services/guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { CreateEntityComponent } from './pages/create-entity/create-entity.component';
import { EntityViewComponent } from './pages/entity-view/entity-view.component';

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
