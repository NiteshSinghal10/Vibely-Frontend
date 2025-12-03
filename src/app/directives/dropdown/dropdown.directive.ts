import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { CommonDirective } from '../common';
import { DropdownComponent } from '../../components';

import { OverlayService } from '../../services';
import { IDropdownConfig, IOption } from '../../components/dropdown/dropdown.types';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective extends CommonDirective<DropdownComponent> {

  @Input() options?: IOption[];

  @Input() config?: IDropdownConfig;

  @Output() selectedOption = new EventEmitter<IOption>();
  

  constructor(
    overlayService: OverlayService,
    elementRef: ElementRef,
  ) {
    super(overlayService, elementRef);
    this.component = DropdownComponent;
  }

  override injectInput(): void {
    if(this.componentRef) {
      if(this.options) {
        this.componentRef.instance.options = this.options;
      }

      if(this.config) {
        this.componentRef.instance.config = this.config;
      }
    }
  }

  override injectOutput(): void {
    this.componentRef?.instance.selectedOption.subscribe(value => {
      this.selectedOption.emit(value);
      this.closeOverlay()
    })
  }
}
