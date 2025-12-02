import { Routes } from '@angular/router';

import { HomeScreenComponent } from './screens';
import { DropdownComponent } from './components';

export const routes: Routes = [
  { path: 'home', component: HomeScreenComponent },
  { path: 'dropdown', component: DropdownComponent }
];
