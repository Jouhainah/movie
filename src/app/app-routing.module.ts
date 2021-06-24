import { NgModule } from '@angular/core';
import {
  PreloadAllModules,
  RouterModule,
  Routes,
  CanActivate,
} from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectauthorizedToHome = () => redirectLoggedInTo(['tabs']);

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectauthorizedToHome },
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectauthorizedToHome },
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./pages/signup/signup.module').then((m) => m.SignupPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectauthorizedToHome },
  },
  {
    path: 'forgotpassword',
    loadChildren: () =>
      import('./pages/forgotpassword/forgotpassword.module').then(
        (m) => m.ForgotpasswordPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectauthorizedToHome },
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'loginscreen',
    loadChildren: () =>
      import('./pages/loginscreen/loginscreen.module').then(
        (m) => m.LoginscreenPageModule
      ),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectauthorizedToHome },
  },

  {
    path: 'tabs',
    loadChildren: () =>
      import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'update-movie',
    loadChildren: () =>
      import('./pages/update-movie/update-movie.module').then(
        (m) => m.UpdateMoviePageModule
      ),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./pages/booking/booking.module').then((m) => m.BookingPageModule),
  },
  {
    path: 'ticket',
    loadChildren: () => import('./pages/ticket/ticket.module').then( m => m.TicketPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
