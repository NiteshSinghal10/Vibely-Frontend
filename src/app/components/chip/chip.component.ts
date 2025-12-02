import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IChipConfig } from './chip.interface';
import { HexToRgbaPipe } from '../../pipes';

@Component({
  selector: 'app-chip',
  imports: [CommonModule, HexToRgbaPipe],
  templateUrl: './chip.component.html'
})
export class ChipComponent {
  @Input() label = 'Chip 1';
  @Input() bgColor = '#FF0000';
  @Input() config?: IChipConfig = {
    textColor: '',
    textSize: '14px'
  };

  getTextColor() {
    return this.config ? this.config.textColor : '';
  }

  getTextSize() {
    return this.config ? this.config.textSize : '';
  }
}
