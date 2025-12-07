export interface ISubscriptionCard {
  planName: string;
  cost: string;
  features: IFeature[],
  buttonText: string;
  isCurrentPlan: boolean;
  color: string;
  bgColor: string;
  width?: string;
  height?: string;
  isPopular?: boolean;
  isCurrent?: boolean;
}

interface IFeature {
  featureName: string;
  inPlan: boolean;
}