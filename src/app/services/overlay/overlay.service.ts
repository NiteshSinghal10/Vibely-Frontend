import { ComponentRef, Injectable, Injector, Type } from '@angular/core';
import { Overlay, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

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

@Injectable({
  providedIn: 'root',
})
export class OverlayService {
  constructor (private overlay: Overlay, private injector: Injector) {
    // empty constructor
  }

  /**
   * Creates an overlay with a component
   * @param component The component to render in the overlay
   * @param config Overlay configuration
   * @returns OverlayRef that can be used to control the overlay
   */
  createOverlay<T> (
    component: Type<T>,
    config: OverlayConfig = {},
  ): { overlayRef: OverlayRef; componentRef: ComponentRef<T> } {
    // Create overlay configuration
    const overlayConfig = {
      width: config.width,
      height: config.height,
      minWidth: config.minWidth,
      minHeight: config.minHeight,
      maxWidth: config.maxWidth,
      maxHeight: config.maxHeight,
      hasBackdrop: config.hasBackdrop ?? true,
      backdropClass: config.backdropClass ?? 'cdk-overlay-backdrop',
      panelClass: config.panelClass ?? 'cdk-overlay-pane',
      positionStrategy: config.positionStrategy ?? this.overlay.position().global(),
      scrollStrategy: config.scrollStrategy ?? this.overlay.scrollStrategies.reposition(),
      disposeOnNavigation: config.disposeOnNavigation ?? true,
    };

    // Create the overlay
    const overlayRef = this.overlay.create(overlayConfig);

    // Create component portal
    const componentPortal = new ComponentPortal(component, null, this.injector);

    // Attach the portal to the overlay
    const componentRef = overlayRef.attach(componentPortal);

    return { overlayRef, componentRef };
  }

  /**
   * Creates a positioned overlay (like a dropdown)
   * @param component The component to render
   * @param originElement The element to position relative to
   * @param config Overlay configuration
   * @returns OverlayRef and ComponentRef
   */
  createPositionedOverlay<T> (
    component: Type<T>,
    originElement: HTMLElement,
    config: OverlayConfig = {},
  ): { overlayRef: OverlayRef; componentRef: ComponentRef<T> } {
    // Create flexible position strategy
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(originElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4,
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
          offsetY: -4,
        },
      ]);

    return this.createOverlay(component, {
      ...config,
      positionStrategy,
      hasBackdrop: config.hasBackdrop ?? true,
      panelClass: config.panelClass ?? 'calendar-overlay-pane',
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
  }

  /**
   * Creates a centered overlay (like a modal)
   * @param component The component to render
   * @param config Overlay configuration
   * @returns OverlayRef and ComponentRef
   */
  createCenteredOverlay<T> (
    component: Type<T>,
    config: OverlayConfig = {},
  ): { overlayRef: OverlayRef; componentRef: ComponentRef<T> } {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    return this.createOverlay(component, {
      ...config,
      positionStrategy,
      hasBackdrop: config.hasBackdrop ?? true,
      backdropClass: config.backdropClass ?? 'modal-backdrop',
    });
  }
}
