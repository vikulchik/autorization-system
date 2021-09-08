import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../guards/Auth.guard';
import { HomepageComponent } from './homepage/homepage.component';
import {MatButtonModule} from '@angular/material/button';

const routes: Routes = [
  {
    path: 'homepage',
    component: HomepageComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  declarations: [
    HomepageComponent
  ],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes)],
    MatButtonModule
  ],
  exports: [RouterModule]
})
export class HomePageModule { }
