import { Routes } from '@angular/router';

import { HomeScreenComponent, LogoutComponent, ProfileScreenComponent, SettingsComponent, FriendsScreenComponent, SubscriptionScreenComponent } from './screens';
import { MultiSelectChipsComponent } from './components';

export const routes: Routes = [
  { path: 'home', component: HomeScreenComponent },
  { path: 'profile', component: ProfileScreenComponent },
  { path: 'chats', component: FriendsScreenComponent },
  { path: 'subscription', component: SubscriptionScreenComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'abc', component: MultiSelectChipsComponent },
];
