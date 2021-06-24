import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailPage } from './detail.page';

const routes: Routes = [
  {
    path: '',
    component: DetailPage,
  },
  {
    path: 'update-movie/:id',
    loadChildren: () =>
      import('../update-movie/update-movie.module').then(
        (m) => m.UpdateMoviePageModule
      ),
  },
  {
    path: 'booking/:id',
    loadChildren: () =>
      import('../booking/booking.module').then((m) => m.BookingPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailPageRoutingModule {}
