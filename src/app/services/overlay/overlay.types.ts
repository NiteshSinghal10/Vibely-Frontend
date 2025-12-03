import { PositionStrategy } from '@angular/cdk/overlay';

export interface OverlayConfig {
  width?: string | number;
  height?: string | number;
  minWidth?: string | number;
  minHeight?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number;
  hasBackdrop?: boolean;
  backdropClass?: string;
  panelClass?: string | string[];
  positionStrategy?: PositionStrategy;
  scrollStrategy?: any;
  disposeOnNavigation?: boolean;
}
