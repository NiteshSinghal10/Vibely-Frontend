import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISubscriptionCard } from './subscription-card.types';
import { CorrectAsset, CrossAsset, PopularAsset } from '../../assets';
import { HexToRgbaPipe } from '../../pipes';
import { ChipComponent, IChipConfig } from '../chip';

@Component({
  selector: 'app-subscription-card',
  imports: [CorrectAsset, CrossAsset, PopularAsset, HexToRgbaPipe, ChipComponent],
  templateUrl: './subscription-card.component.html'
})
export class SubscriptionCardComponent {
  @Input() subscription: ISubscriptionCard = {
    planName: 'Free Vibe',
    cost: '$0 / Forever',
    isCurrentPlan: true,
    features: [
      { featureName: 'Unlimited Chating', inPlan: true },
      { featureName: 'Profile Change', inPlan: true },
      { featureName: 'No Ads', inPlan: false },
      { featureName: 'Gender Filter', inPlan: false },
      { featureName: 'Country Filter', inPlan: false },
      { featureName: 'Send Friend Request', inPlan: false },
    ],
    color: '#1D4ED8',
    bgColor: '#DBEAFE',
    buttonText: 'Current Plan',
    width: '350px'
  }

  @Output() clicked = new EventEmitter();

  chipConfig?: IChipConfig = {
    textSize: '14px',
    maxWidth: '200px',
    crossIcon: {
      show: false,
    }
  };


  clickPlanButton() {
    this.clicked.emit();
  }
}
