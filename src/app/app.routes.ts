import { Routes } from '@angular/router';

import { HomeScreenComponent, ProfileScreenComponent, SettingsComponent, FriendsScreenComponent, SubscriptionScreenComponent } from './screens';
import { SkeletonLoaderComponent } from './components';

export const routes: Routes = [
  { path: '', component: HomeScreenComponent },
  { path: 'profile', component: ProfileScreenComponent },
  { path: 'chats', component: FriendsScreenComponent },
  { path: 'subscription', component: SubscriptionScreenComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'abc', component: SkeletonLoaderComponent },
];
