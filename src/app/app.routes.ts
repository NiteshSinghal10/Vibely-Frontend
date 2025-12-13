import { Routes } from '@angular/router';

import { HomeScreenComponent, ProfileScreenComponent, SettingsComponent, FriendsScreenComponent, SubscriptionScreenComponent } from './screens';
import { SubscriptionCardComponent, ModalComponent } from './components';

export const routes: Routes = [
  { path: 'home', component: HomeScreenComponent },
  { path: 'profile', component: ProfileScreenComponent },
  { path: 'chats', component: FriendsScreenComponent },
  { path: 'subscription', component: SubscriptionScreenComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'abc', component: SubscriptionCardComponent },
];
