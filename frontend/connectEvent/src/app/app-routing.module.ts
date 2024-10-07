import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { PrincipalComponent } from './principal/principal.component';
import { HomePageComponent } from './principal/home-page/home-page.component';
import { LoginComponent } from './principal/login/login.component';
import { RegisterComponent } from './principal/register/register.component';
import { AreaUsuarioComponent } from './principal/area-usuario/area-usuario.component';
import { AreaEmpreendedorComponent } from './principal/area-empreendedor/area-empreendedor.component';
import { CardComponent } from './principal/home-page/card/card.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  {
    path: 'navBar',
    component: NavBarComponent,
    children: [],
  },
  { path: 'sideMenu', component: SideMenuComponent },
  {
    path: 'principal',
    component: PrincipalComponent,
    children: [
      {
        path: 'homePage',
        component: HomePageComponent,
        children: [{ path: 'card', component: CardComponent }],
      },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'areaUsuario', component: AreaUsuarioComponent },
      { path: 'areaEmpreendedor', component: AreaEmpreendedorComponent },
    ],
  },
  { path: 'footer', component: FooterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
