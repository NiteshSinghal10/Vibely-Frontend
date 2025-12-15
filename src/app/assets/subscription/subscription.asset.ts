import { Component, Input } from '@angular/core';

@Component({
  selector: 'asset-subscription',
  imports: [],
  templateUrl: './subscription.asset.svg'
})
export class SubscriptionAsset {
  @Input() height = '18';
  @Input() width = '18';
  @Input() fill = '#ff0000';
  @Input() class = '';
}
