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
  
  @Output() deselectedOption = new EventEmitter<IOption>();

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
    return option.selected ? option.selected : this.optionsSelectedByUser.some(selectedOption => selectedOption.value === option.value);
  }

  get isMultiSelect() {
    return !!(this.config?.multiSelect);
  }
  
  get searchBarPlaceholder() {
    return this.config?.searchPlaceHolder ?? '';
  }

  get searchNoFoundPlaceholder() {
    return this.config?.searchNotFound ?? '';
  }

  get isOptionPrefix() {
    return this.config?.optionPrefix;
  }

  get isShowSearchbar() {
    return this.config ? this.config.searchBar : false;
  }

  get classForOptions() {
    const style = this.config
    ? {
        fontSize: this.config.textSize,
    }
    : {};

    return style;
  }

  getOptionTextColor(option: IOption) {
    return option.textColor ?? this.config?.textColor ?? '';
  }

  getImageWidth(option: IOption) {
    return option.imgWidth ?? '20px';
  }

  getImageHeight(option: IOption) {
    return option.imgHeight ?? '20px';
  }
  
  get maxHeight() {
    return this.config ? this.getSize(this.config.maxHeight) : ''
  }

  get width() {
    return this.config ? this.getSize(this.config.width) : ''
  }

  get filteredOptions() {
    return this.options.filter(option => option.label.toLowerCase().includes(this.searchInput.toLowerCase()));
  }

  selectOption(option: IOption) {

    if(this.isMultiSelect) {
      if (this.getIsOptionSelected(option)) {
        this.optionsSelectedByUser = this.optionsSelectedByUser.filter(selectedOption => selectedOption.value !== option.value);
        this.deselectedOption.emit(option);
        return;
      } else {
        this.optionsSelectedByUser.push(option);
      }
    }

    this.selectedOption.emit(option);
  }
}
