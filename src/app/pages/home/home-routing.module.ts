import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'add-movie',
    loadChildren: () =>
      import('../add-movie/add-movie.module').then((m) => m.AddMoviePageModule),
  },
  {
    path: 'detail/:id',
    loadChildren: () =>
      import('../detail/detail.module').then((m) => m.DetailPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
