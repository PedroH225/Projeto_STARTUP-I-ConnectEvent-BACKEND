import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FilterComponent } from './nav-bar/filter/filter.component';

const routes: Routes = [
  { path: 'footer', component: FooterComponent },
  {
    path: 'navBar',
    component: NavBarComponent,
    children: [{ path: 'filter', component: FilterComponent }],
  },
  { path: 'sideMenu', component: SideMenuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
