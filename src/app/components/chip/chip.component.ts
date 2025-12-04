import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IChip, IChipConfig } from './chip.types';
import { HexToRgbaPipe } from '../../pipes';

import { CrossAsset } from '../../assets';

@Component({
  selector: 'app-chip',
  imports: [CommonModule, HexToRgbaPipe, CrossAsset],
  templateUrl: './chip.component.html',
  providers: [HexToRgbaPipe]
})
export class ChipComponent {
  @Input() chip: IChip = {
    label: 'Chip 1',
    value: 'chip-1',
    bgColor: '#FF0000'
  };

  @Input() config?: IChipConfig = {
    textColor: '',
    textSize: '14px',
    maxWidth: '200px',
    crossIcon: {
      show: true,
      width: '20',
      height: '20'
    }
  };

  @Output() crossChip = new EventEmitter<IChip>();

  constructor(private hexToRgbaPipe: HexToRgbaPipe) {}

  isHovered = false;

  get maxWidth() {
    return this.config ? this.config.maxWidth : '200px'
  }

  get crossIconSize() {
    const size = this.config ? { width: this.config.crossIcon.width ?? '20', height: this.config.crossIcon.height ?? '20' } : { width: '20', height: '20' }
    return size;
  }

  get crossButtonBgColor() {
    return this.isHovered ? this.hexToRgbaPipe.transform(this.chip.bgColor, 0.3) : 'transparent';
  }

  get textColor() {
    return this.config ? this.config.textColor : '';
  }

  get textSize() {
    return this.config ? this.config.textSize : '';
  }

  clickCrossIcon() {
    this.crossChip.emit(this.chip);
  }
}
