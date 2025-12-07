import { ISubscriptionCard } from "../../components";

export const plans: ISubscriptionCard[] = [
  {
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
    color: '#555555',
    bgColor: '#F5F5F5',
    buttonText: 'Default Plan',
    width: '100%',
    height: '100%',
    isCurrent: true
  },
  {
    planName: 'Pro Vibe',
    cost: '$1.99 / month',
    isCurrentPlan: true,
    features: [
      { featureName: 'Unlimited Chating', inPlan: true },
      { featureName: 'Profile Change', inPlan: true },
      { featureName: 'No Ads', inPlan: true },
      { featureName: 'Gender Filter', inPlan: true },
      { featureName: 'Country Filter', inPlan: false },
      { featureName: 'Send Friend Request', inPlan: false },
    ],
    color: '#15803D',
    bgColor: '#DCFCE7',
    buttonText: 'Get Pro Vibe',
    width: '100%',
    height: '100%',
    isPopular: true
  },
  {
    planName: 'Premium Vibe',
    cost: '$2.99 / month',
    isCurrentPlan: true,
    features: [
      { featureName: 'Unlimited Chating', inPlan: true },
      { featureName: 'Profile Change', inPlan: true },
      { featureName: 'No Ads', inPlan: true },
      { featureName: 'Gender Filter', inPlan: true },
      { featureName: 'Country Filter', inPlan: true },
      { featureName: 'Send Friend Request', inPlan: true },
    ],
    color: '#1D4ED8',
    bgColor: '#DBEAFE',
    buttonText: 'Upgrade Now',
    width: '100%',
    height: '100%'
  }
];