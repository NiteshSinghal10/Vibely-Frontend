import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IDropdownConfig, IOption } from './dropdown.types';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule],
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent {
  @Input() options: IOption[] = [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
    { label: 'Option 4', value: 'option-4' },
    { label: 'Option 5', value: 'option-5' }
  ];

  @Input() config?: IDropdownConfig = {
    textSize: '14px',
    textColor: '#636363',
    maxHeight: 'sm',
    maxWidth: 'sm'
  }

  @Output() selectedOption = new EventEmitter<IOption>();

  private getSize(size?: string) {
    switch(size) {
      case 'sm':
      return '300px';
      case 'md':
      return '500px';
      case 'lg':
      return '700px';
      default:
        return '';
    }
  }

  getClassForOptions() {
    const style = this.config
    ? {
        color: this.config.textColor,
        fontSize: this.config.textSize,
    }
    : {};

    return style;
  }

  getClassForDropdown() {
    const style = this.config
    ? {
      maxHeight: this.getSize(this.config.maxHeight),
      maxWidth: this.getSize(this.config.maxWidth)
    }
    : {};

    return style;
  }

  selectOption(option: IOption) {
    this.selectedOption.emit(option);
  }
}
