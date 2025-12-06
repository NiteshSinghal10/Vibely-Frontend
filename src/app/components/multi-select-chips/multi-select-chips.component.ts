import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IMultiSelectChipOptions } from './multi-select-chips.types';
import { PlusAsset, CorrectAsset } from '../../assets';

@Component({
  selector: 'app-multi-select-chips',
  imports: [PlusAsset, CorrectAsset],
  templateUrl: './multi-select-chips.component.html'
})
export class MultiSelectChipsComponent {
  @Input() maxHeight = '300px';
  @Input() minHeight = '200px';
  @Input() width = '500px';
  @Input() selectedChipBgColor = '#DCFCE7';
  @Input() selectedChipTextColor = '#15803D';
  
  @Input() chips: IMultiSelectChipOptions[] = [
    { label: 'Chip 1', value: 'chip-1', bgColor: '#FEE2E2', textColor: '#B91C1C' },
    { label: 'Chip 2', value: 'chip-2', bgColor: '#FEE2E2', textColor: '#B91C1C' },
    { label: 'Chip 3', value: 'chip-3', bgColor: '#FEE2E2', textColor: '#B91C1C' },
    { label: 'Chip 4', value: 'chip-4', bgColor: '#FEE2E2', textColor: '#B91C1C' },
    { label: 'Chip 5', value: 'chip-5', bgColor: '#FEE2E2', textColor: '#B91C1C' },
  ];

  @Output() selectedChip = new EventEmitter<IMultiSelectChipOptions>();

  @Output() deselectedChip = new EventEmitter<IMultiSelectChipOptions>();

  selectedChips: IMultiSelectChipOptions[] = [];

  get chipsList(): IMultiSelectChipOptions[] {
    return this.chips;
  }

  getIsChipSelected(chip: IMultiSelectChipOptions) {
    return this.selectedChips.some(selectedChip => selectedChip.value === chip.value);
  }

  getChipBgColor(chip: IMultiSelectChipOptions) {
    const isChipSelected = this.getIsChipSelected(chip);

    return isChipSelected ? this.selectedChipBgColor : chip.bgColor;
  }

  getChipTextColor(chip: IMultiSelectChipOptions) {
    const isChipSelected = this.getIsChipSelected(chip);

    return isChipSelected ? this.selectedChipTextColor : chip.textColor;
  }

  selectChip(chip: IMultiSelectChipOptions) {
    const isChipSelected = this.getIsChipSelected(chip);

    if(isChipSelected) {
      this.selectedChips = this.selectedChips.filter(selectedChip => selectedChip.value !== chip.value);
      this.deselectedChip.emit(chip);
    } else {
      this.selectedChips.push(chip);
      this.selectedChip.emit(chip);
    }
  }
}
