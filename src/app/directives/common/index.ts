import { ComponentRef, Directive, ElementRef, HostListener, OnDestroy, Type } from '@angular/core';
import { OverlayRef } from '@angular/cdk/overlay';

import { OverlayService } from '../../services';


@Directive({
  selector: '[appCommon]',
  standalone: true,
})
export class CommonDirective<T> implements OnDestroy {

  constructor (
    protected overlayService: OverlayService,
    protected elementRef: ElementRef
  ) {
    // Empty Constructor
  }

  component!: Type<T>;
  overlayRef: OverlayRef | null = null;
  componentRef: ComponentRef<T> | null = null;

  ngOnDestroy (): void {
    this.closeOverlay();
  }

  @HostListener('click', [ '$event' ])
  onClick (event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.overlayRef) {
      this.closeOverlay();
    } else {
      this.createOverlay();
    }
  }

  /**
  * Creates an overlay with the calendar component
  */
  private createOverlay (): void {

    // Create positioned overlay
    const { overlayRef, componentRef } = this.overlayService.createPositionedOverlay<T>(
      this.component,
      this.elementRef.nativeElement,
    );

    this.overlayRef = overlayRef;
    this.componentRef = componentRef;

    // To inject input
    this.injectInput();

    // To inject output
    this.injectOutput();

    // Handle backdrop clicks
    overlayRef.backdropClick().subscribe(() => {
      this.closeOverlay();
    });

    // Handle overlay detachments
    overlayRef.detachments().subscribe(() => {
      this.overlayRef = null;
      this.componentRef = null;
    });
  }


  /**
   * Closes the overlay and cleans up resources
   */
  closeOverlay (): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
      this.componentRef = null;
    }
  }

  injectInput() {
    // Write your inputs
  }

  injectOutput() {
    // Write your outputs
  }
}
