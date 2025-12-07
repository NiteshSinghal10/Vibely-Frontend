import { Component } from '@angular/core';
import { ISubscriptionCard, SubscriptionCardComponent } from '../../components';
import { plans } from './plans';

@Component({
  selector: 'app-subscription-screen',
  imports: [SubscriptionCardComponent],
  templateUrl: './subscription-screen.component.html'
})
export class SubscriptionScreenComponent {
  subscriptions: ISubscriptionCard[] = plans;
}
