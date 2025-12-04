import { Routes } from '@angular/router';

import { HomeScreenComponent } from './screens';
import { SelectedChipsComponentComponent } from './components';

export const routes: Routes = [
  { path: 'home', component: HomeScreenComponent },
  { path: 'abc', component: SelectedChipsComponentComponent },
];
