import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { CommonDirective } from '../common';
import { DropdownComponent } from '../../components/dropdown/dropdown.component';
import { IDropdownConfig, IOption } from '../../components/dropdown/dropdown.types';

import { OverlayService } from '../../services';

@Directive({
  selector: '[appDropdown]',
  standalone: true 
})
export class DropdownDirective extends CommonDirective<DropdownComponent> {

  @Input() options?: IOption[];

  @Input() config?: IDropdownConfig;

  @Output() selectedOption = new EventEmitter<IOption>();
  
  @Output() selectionComplete = new EventEmitter<Boolean>();

  @Output() deselectedOption = new EventEmitter<IOption>();

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
      if(!this.config?.multiSelect) {
        this.closeOverlay()
      }

      this.selectedOption.emit(value);
    });

    this.componentRef?.instance.deselectedOption.subscribe(value => this.deselectedOption.emit(value));

    this.overlayRef?.backdropClick().subscribe(() => this.selectionComplete.emit(true));
  }
}
