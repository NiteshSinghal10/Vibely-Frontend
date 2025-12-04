import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IDropdownConfig, IOption } from './dropdown.types';

@Component({
  selector: 'app-dropdown',
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.component.html'
})
export class DropdownComponent {
  @Input() options: IOption[] = [
    { label: 'Option 1', value: 'option-1' },
    { label: 'Option 2', value: 'option-2' },
    { label: 'Option 3', value: 'option-3' },
    { label: 'Option 4', value: 'option-4' },
    { label: 'Option 5', value: 'option-5' },
    { label: 'Option 6', value: 'option-6' },
    { label: 'Option 7', value: 'option-7' },
    { label: 'Option 8', value: 'option-8' },
    { label: 'Option 9', value: 'option-9' },
    { label: 'Option 10', value: 'option-10' },
    { label: 'Option 11', value: 'option-11' }
  ];

  @Input() config?: IDropdownConfig = {
    textSize: '14px',
    textColor: '#636363',
    maxHeight: 'sm',
    width: 'sm',
    searchBar: true,
    optionPrefix: false,
    searchPlaceHolder: 'Search',
    searchNotFound: 'No Options',
    multiSelect: true
  }

  @Output() selectedOption = new EventEmitter<IOption>();

  searchInput = '';

  optionsSelectedByUser: IOption[] = []

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

  getIsOptionSelected(option: IOption) {
    return !!(option.selected) || (this.optionsSelectedByUser.some(selectedOption => selectedOption.value === option.value));
  }

  getIsMultiSelect() {
    return !!(this.config?.multiSelect);
  }
  
  getSearchBarPlaceholder() {
    return this.config?.searchPlaceHolder ?? '';
  }

  getSearchNoFoundPlaceholder() {
    return this.config?.searchNotFound ?? '';
  }

  getIsOptionPrefix() {
    return this.config?.optionPrefix;
  }

  getIsShowSearchbar() {
    return this.config ? this.config.searchBar : false;
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
  
  getMaxHeight() {
    return this.config ? this.getSize(this.config.maxHeight) : ''
  }

  getWidth() {
    return this.config ? this.getSize(this.config.width) : ''
  }

  getFilteredOptions() {
    return this.options.filter(option => option.label.toLowerCase().includes(this.searchInput.toLowerCase()));
  }

  selectOption(option: IOption) {
    if(this.getIsMultiSelect()) {
      if (this.getIsOptionSelected(option)) {
        this.optionsSelectedByUser = this.optionsSelectedByUser.filter(selectedOption => selectedOption.value !== option.value);
      } else {
        this.optionsSelectedByUser.push(option);
      }
    }

    this.selectedOption.emit(option);
  }
}
